const api = require('../db/api');

const remove = async (req, res) => {
    const dataApi = await api('remove', req.params.rowkey);
    res.send(dataApi);
}

module.exports = remove;