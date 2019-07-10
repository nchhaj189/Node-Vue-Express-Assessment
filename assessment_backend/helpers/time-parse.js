function minToMilli(duration) {
    duration = parseInt(duration);
    return duration * 60000;
}

module.exports = function (calendarEvent, eventList, action) {
    if(action === 'update') {
        for(var i = 0; i < eventList.length; i++) {
            if(eventList[i].id === calendarEvent.id) {
                eventList.splice(i,1);
                break;
            }
        }
    }

    let currentEventStartTime = Date.parse(calendarEvent.dateTime);
    let lastEventStartTime = Date.parse(eventList[eventList.length - 1].dateTime);
    let firstEventStartTime = Date.parse(eventList[0].dateTime);
    
    if(lastEventStartTime < currentEventStartTime) { //end of array case - last event to occur
        if(lastEventStartTime + minToMilli(eventList[eventList.length - 1].duration) <= currentEventStartTime) {
            eventList.push(calendarEvent);
            return true;
        } else {
            for(var i = 0; i < eventList.length; i++) {
                if(eventList[i].id === calendarEvent.id) {
                    eventList.splice(i,1);
                    break;
                }
            }
            return false; //overlaps
        }

    } else if(firstEventStartTime > currentEventStartTime) { //beginning of array case - first event to occur
        if(currentEventStartTime + minToMilli(calendarEvent.duration) <= firstEventStartTime) {
            eventList.unshift(calendarEvent);
            return true;
        } else {
            return false; //overlaps
        }

    } else { //in between case
        for(var i = 0; i < eventList.length - 1; i++) {
            let before = Date.parse(eventList[i].dateTime);
            let after = Date.parse(eventList[i+1].dateTime);
            if(currentEventStartTime > before && currentEventStartTime < after) {
                if(before + minToMilli(eventList[i].duration) <= currentEventStartTime && currentEventStartTime + minToMilli(calendarEvent.duration) <= after) {
                    eventList.splice(i+1, 0, calendarEvent);
                    return true;
                } else {
                    return false;
                }
            } else if(i + 1 == eventList.length - 1) {
                return false; //overlaps
            } 
        }
    }
}
