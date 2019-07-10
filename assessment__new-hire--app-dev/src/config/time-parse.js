export function timeparse(calendarEvent, eventList, action) {

    let currentEventStartTime = Date.parse(calendarEvent.dateTime);
    let lastEventStartTime = Date.parse(eventList[eventList.length - 1].dateTime);
    let firstEventStartTime = Date.parse(eventList[0].dateTime);

    if(lastEventStartTime < currentEventStartTime) { //end of array case - last event to occur
        console.log('case 1');
        if(lastEventStartTime + minToMilli(eventList[eventList.length - 1].duration) < currentEventStartTime && action) {
            if(action === 'update') {
                for(var i = 0; i < eventList.length; i++) {
                    if(eventList[i].id === calendarEvent.id) {
                        eventList.splice(i,1);
                        break;
                    }
                }
            }
            eventList.push(calendarEvent);
            return true;
        } else {
            return false; //overlaps
        }

    } else if(firstEventStartTime > currentEventStartTime) { //beginning of array case - first event to occur
        console.log('case 2');
        console.log(currentEventStartTime.duration)
        console.log(currentEventStartTime + minToMilli(currentEventStartTime.duration));
        console.log(currentEventStartTime + minToMilli(currentEventStartTime.duration) < firstEventStartTime);
        if(currentEventStartTime + minToMilli(calendarEvent.duration) < firstEventStartTime) {
            console.log('passes');
            if(action === 'update') {
                for(var i = 0; i < eventList.length; i++) {
                    if(eventList[i].id === calendarEvent.id) {
                        eventList.splice(i,1);
                        break;
                    }
                }
            }
            eventList.unshift(calendarEvent);
            console.log(eventList);
            return true;
        } else {
            console.log('overlaps');
            return false; //overlaps
        }

    } else { //in between case
        for(var i = 0; i < eventList.length - 1; i++) {
            console.log('case 3');
            let before = Date.parse(eventList[i].dateTime);
            let after = Date.parse(eventList[i+1].dateTime);
            
            if(currentEventStartTime > before && currentEventStartTime < after) {
                
                if(before + minToMilli(eventList[i].duration) <= currentEventStartTime && currentEventStartTime + minToMilli(calendarEvent.duration) <= after) {
                    console.log('passes');
                    if(action === 'update') {
                        for(var i = 0; i < eventList.length; i++) {
                            if(eventList[i].id === calendarEvent.id) {
                                eventList.splice(i,1);
                                break;
                            }
                        }
                        console.log(eventList);
                    }
                    eventList.splice(i+1, 0, calendarEvent);
                    console.log(eventList)
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

function minToMilli(duration) {
    console.log(duration)
    duration = parseInt(duration);
    return duration * 60000;
}