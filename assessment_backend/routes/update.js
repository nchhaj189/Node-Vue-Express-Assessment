const api = require('../db/api');
const timeParse = require('../helpers/time-parse');

const update = async (req, res) => {
    let update;
    let calendarEvent = req.body.data.events[0];
    let calendarEventDate = calendarEvent.dateTime.split("T")[0];

    let peekData = await api('peek');
    peekData = JSON.parse(peekData);
    let messages = peekData.message;

    let messageIndex = null;
    let eventIndex = null;
    let currentDateExistsInArray;
    let deleted = true;

    for(var i = 0; i < messages.length; i++) {
        for(var j = 0; j < messages[i].data.events.length; j++) {
            let currentDate = messages[i].name;
            let currentEventID = messages[i].data.events[j].id;
            if(calendarEvent === messages[i].data.events[j]) {
                console.log('no update');
                res.status(200);
                return;
            }
            if(currentDate === calendarEventDate) {
                update = true;
                currentDateExistsInArray = true;
            } 
            if(currentEventID === calendarEvent.id) {
                messageIndex = i;
                eventIndex = j;
                deleted = false;
            }
        }
    }

    let removed = false;
    if(messageIndex >= 0 && eventIndex >= 0 && !deleted) {
        messages[messageIndex].data.events.splice(eventIndex, 1);
        const body = { "data": { "events": messages[messageIndex].data.events} };
        await api('update', messages[messageIndex].name.split("T")[0], JSON.stringify(body));
        deleted = true;
        if(messages[messageIndex].data.events.length === 0) {
            removed = true;
            await api('remove', messages[messageIndex].name.split("T")[0]);
        }
    }

    
    if(!currentDateExistsInArray && !update) {
        messages[messageIndex].data.events.splice(eventIndex, 1);
        const body = { "data": { "events": messages[messageIndex].data.events} };
        if(!removed) {
            await api('update', messages[messageIndex].name.split("T")[0], JSON.stringify(body));
            let createJson = await api('create', calendarEventDate, JSON.stringify(req.body)); 
            res.send(createJson);
        } else {
            let createJson = await api('create', calendarEventDate, JSON.stringify(req.body)); 
            res.send(createJson);
        }
        return; 
    }


    let data = await api('read', req.params.rowkey);
    data = JSON.parse(data);
    let events_list = data.message.events;

    if(update && currentDateExistsInArray) {
        if(timeParse(calendarEvent, events_list, 'update')) {
            req.body.data.events = events_list;
            const updateMsg = await api('update', req.params.rowkey, JSON.stringify(req.body));
            res.send(updateMsg);
        } else {
            res.status(404).json({"message" : "Overlapping Event"});
            return;
        }
    } 
}

module.exports = update;