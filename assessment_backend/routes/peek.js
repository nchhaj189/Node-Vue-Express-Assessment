const api = require('../db/api');

const peek = async (req, res) => {
    const dataApi = await api('peek');
    res.send(dataApi);
}

module.exports = peek;