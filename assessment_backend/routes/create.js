const api = require('../db/api');
const create = async (req, res) => {
    const dataApi = await api('create', req.params.rowkey, JSON.stringify(req.body));
    res.send(dataApi);
}

module.exports = create;
