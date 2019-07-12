const api = require('../db/api');
const timeParse = require('../helpers/time-parse');

const create = async (req, res) => {
    let update;
    let calendarEvent = req.body.data.events[0];
    let json = await api('peek');
    json = JSON.parse(json);
    for(var i = 0; i < json.message.length; i++) {
        if(json.message[i].name === calendarEvent.dateTime.split("T")[0]) {
            update = true;
            break;
        } 
    }
    if(update) {
        let updateJson = await api('read', req.params.rowkey);
        updateJson = JSON.parse(updateJson);
        let events_list = updateJson.message.events;

        if(timeParse(calendarEvent, events_list, 'update')) {
            req.body.data.events = events_list;
            const dataApi = await api('update', req.params.rowkey, JSON.stringify(req.body));
            res.send(dataApi);
        } else {
            res.status(404).json({"message" : "Overlapping Event"});
            return;
        }
    } else {
        const dataApi = await api('create', req.params.rowkey, JSON.stringify(req.body));
        res.send(dataApi);
    }
}

module.exports = create;
