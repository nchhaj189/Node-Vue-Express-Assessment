const api = require('../db/api');
const remove = require('./remove');
const read = async (req, res) => {
    let dataApi = await api('read', req.params.rowkey);
    res.send(dataApi);
    return dataApi;
}

module.exports = read;