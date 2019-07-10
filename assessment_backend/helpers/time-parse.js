function minToMilli(duration) {
    console.log(duration)
    duration = parseInt(duration);
    return duration * 60000;
}

module.exports = function (calendarEvent, eventList, action) {
    console.log(`event list length ${eventList.length}`);
    if(action === 'update') {
        for(var i = 0; i < eventList.length; i++) {
            if(eventList[i].id === calendarEvent.id) {
                eventList.splice(i,1);
                break;
            }
        }
    }
    console.log(`event list length ${eventList.length}`);
    let currentEventStartTime = Date.parse(calendarEvent.dateTime);
    let lastEventStartTime = Date.parse(eventList[eventList.length - 1].dateTime);
    let firstEventStartTime = Date.parse(eventList[0].dateTime);
    
    console.log(`first case boolean ${lastEventStartTime < currentEventStartTime}`);
    console.log('first event start time ' + eventList[eventList.length - 1].dateTime);
    console.log('current event start time ' + calendarEvent.dateTime);
    if(lastEventStartTime < currentEventStartTime) { //end of array case - last event to occur
        console.log('case 1');
        console.log(`case 1 boolean 2 ${lastEventStartTime + minToMilli(eventList[eventList.length - 1].duration) <= currentEventStartTime}`)
        if(lastEventStartTime + minToMilli(eventList[eventList.length - 1].duration) <= currentEventStartTime) {
            eventList.push(calendarEvent);
            return true;
        } else {
            console.log('moved to else statement')
            console.log(eventList.length);
            for(var i = 0; i < eventList.length; i++) {
                console.log(i);
                if(eventList[i].id === calendarEvent.id) {
                    console.log(`${calendarEvent.id} & ${event[i].id}`)
                    eventList.splice(i,1);
                    break;
                }
                console.log('not found')
            }
            return false; //overlaps
        }

    } else if(firstEventStartTime > currentEventStartTime) { //beginning of array case - first event to occur
        console.log('case 2');
        if(currentEventStartTime + minToMilli(calendarEvent.duration) <= firstEventStartTime) {
            console.log('passes');
            eventList.unshift(calendarEvent);
            return true;
        } else {
            console.log('overlaps');
            return false; //overlaps
        }

    } else { //in between case
        console.log('case 3');
        for(var i = 0; i < eventList.length - 1; i++) {
            let before = Date.parse(eventList[i].dateTime);
            let after = Date.parse(eventList[i+1].dateTime);
            if(currentEventStartTime > before && currentEventStartTime < after) {
                if(before + minToMilli(eventList[i].duration) <= currentEventStartTime && currentEventStartTime + minToMilli(calendarEvent.duration) <= after) {
                    console.log('passes');
                    eventList.splice(i+1, 0, calendarEvent);
                    return true;
                } else {
                    console.log('fails');
                    return false;
                }
            } else if(i + 1 == eventList.length - 1) {
                return false; //overlaps
                console.log('fails');
            } 
        }
    }
}
