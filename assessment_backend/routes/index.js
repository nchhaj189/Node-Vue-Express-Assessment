const router = require('express').Router();
const deleteUpdate = require('./deleteUpdate');
const create = require('./create');
const peek = require('./peek');
const read = require('./read');
const remove = require('./remove');
const update = require('./update');

//router.get('/test', test); test route

//main routes to API
router.post('/create/:rowkey', create);

router.delete('/remove/:rowkey', remove);

router.put('/update/:rowkey', update);

router.put('/deleteUpdate/:rowkey', deleteUpdate);

router.get('/read/:rowkey', read);

router.get('/peek', peek);

module.exports = router;