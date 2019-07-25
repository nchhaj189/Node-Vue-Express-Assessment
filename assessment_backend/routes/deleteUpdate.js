const api = require('../db/api');
const timeParse = require('../helpers/time-parse');
const read = require('./read');
const remove = require('./remove');

const deleteUpdate = async (req, res) => {
    let events_list = [];
    let dataApi = await read(req, res);
    dataApi = JSON.parse(dataApi);
    events_list = dataApi.message.events;
    for(var i = 0; i < events_list.length; i++) {
        if(events_list[i].id === req.body.data.id) {
            events_list.splice(i,1);
            break;
        }
    }
    
    if(events_list.length === 0) {
        let remove = await api('remove', req.params.rowkey);
    } else {
        const body = { "data": { "events": events_list } };
        let remove = await api('update', req.params.rowkey, JSON.stringify(body));
    }
    return;
}

module.exports = deleteUpdate;