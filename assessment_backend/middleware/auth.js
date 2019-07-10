const login = require('../config/config.js');
module.exports = (req, res, next) => {
    if(req.headers.authorization === login) {
        next();
    } else {
        res.status(403).json({"message": "didn't work"});
    }
}