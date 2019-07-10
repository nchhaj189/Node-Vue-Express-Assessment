const api = require('../db/api');

const read = async (req, res) => {
    const dataApi = await api('read', req.params.rowkey);
    res.send(dataApi);
}

module.exports = read;