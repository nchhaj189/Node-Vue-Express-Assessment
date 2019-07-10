const api = require('../db/api');

const peek = async (req, res) => {
    const dataApi = await api('peek');
    let json = JSON.parse(dataApi);
    res.send(json);
}

module.exports = peek;