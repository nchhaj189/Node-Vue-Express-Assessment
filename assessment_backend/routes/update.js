const api = require('../db/api');
const timeParse = require('../helpers/time-parse');

const update = async (req, res) => {
    let data = await api('read', req.params.rowkey);
    data = JSON.parse(data);
    let events_list = data.message.events;
    let update = false;
    for(var i = 0; i < events_list.length; i++) {
        if(req.body.data.events[0].id === events_list[i].id) {
            update = true;
            break;
        }
    }

    if(update) {
        if(timeParse(req.body.data.events[0], events_list, 'update')) {
            req.body.data.events = events_list;
            const dataApi = await api('update', req.params.rowkey, JSON.stringify(req.body));
            res.send(dataApi);
        } else {
            res.status(404).json({"message" : "Overlapping Event"});
            return;
        }
    } else {
        if(timeParse(req.body.data.events[0], events_list)) {
            req.body.data.events = events_list;
            const dataApi = await api('update', req.params.rowkey, JSON.stringify(req.body));
            res.send(dataApi);
        } else {
            res.status(404).json({"message" : "Overlapping Event"});
            return;
        }
    }

}

module.exports = update;