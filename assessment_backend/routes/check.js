const login = require('../config/config.js');
const check = async (req, res) => {
    if(req.headers.authorization === login) {
        res.status(200).json({"message":"successful"});
    } else {
        res.status(403).json({"message":"unsuccessful"});
    }
}

module.exports = check;