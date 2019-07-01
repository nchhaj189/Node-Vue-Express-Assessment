const api = require('../db/api');
const update = async (req, res) => {
    console.log(req.body);
    const dataApi = await api('update', req.params.rowkey, JSON.stringify(req.body));
    console.log(dataApi);
    res.send(dataApi);
}

module.exports = update;