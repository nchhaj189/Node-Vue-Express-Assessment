const api = require('../db/api');

const read = async (req, res) => {
    const dataApi = await api('read', req.params.rowkey);
    // var events = dataApi["events"];
    // console.log(events);
    res.send(dataApi);
}

module.exports = read;