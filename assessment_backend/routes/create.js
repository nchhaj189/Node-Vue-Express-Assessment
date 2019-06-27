const api = require('../db/api');

let body;
const create = (req, res) => {
    const dataApi = api('create', req.params.rowkey, body);
    res.send(dataApi);
}
