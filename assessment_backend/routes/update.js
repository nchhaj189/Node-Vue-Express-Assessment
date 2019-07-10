const api = require('../db/api');
const timeParse = require('../helpers/time-parse');

const update = async (req, res) => {
    console.log(req.body);
    let data = await api('read', req.params.rowkey);
    data = JSON.parse(data);
    //console.log(data.message.events);
    let events_list = data.message.events;
    let update = false;
    for(var i = 0; i < events_list.length; i++) {
        console.log(req.body.data.events[0].id);
        //console.log(events_list)
        if(req.body.data.events[0].id === events_list[i].id) {
            update = true;
            break;
        }
        console.log(update);
    }

    console.log(update);
    if(update) {
        if(timeParse(req.body.data.events[0], events_list, 'update')) {
            req.body.data.events = events_list;
            const dataApi = await api('update', req.params.rowkey, JSON.stringify(req.body));
            //console.log(dataApi);
            res.send(dataApi);
        } else {
            console.log('overlapping');
            res.status(404).json({"message" : "Overlapping Event"});
            return;
        }
    } else {
        if(timeParse(req.body.data.events[0], events_list)) {
            req.body.data.events = events_list;
            const dataApi = await api('update', req.params.rowkey, JSON.stringify(req.body));
            console.log(dataApi);
            res.send(dataApi);
        } else {
            res.status(404).json({"message" : "Overlapping Event"});
            return;
        }
    }

}

module.exports = update;