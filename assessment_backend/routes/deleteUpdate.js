const api = require('../db/api');
const timeParse = require('../helpers/time-parse');

const update = async (req, res) => {
    const dataApi = await api('update', req.params.rowkey, JSON.stringify(req.body));
    res.send(dataApi);
}

module.exports = update;