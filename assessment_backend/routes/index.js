const router = require('express').Router();
const test = require('./test');
const create = require('./create');
const peek = require('./peek');

router.get('/test', test);
//router.post('/create/:rowkey', create)
router.get('/peek', peek);

module.exports = router;