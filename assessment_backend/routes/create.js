const api = require('../db/api');
const create = async (req, res) => {
    console.log('starting creation');
    //let default_body_test = JSON.stringify({"data":"test"}); //test data
    console.log(JSON.stringify(req.body));
    const dataApi = await api('create', req.params.rowkey, JSON.stringify(req.body));
    res.send(dataApi);
}

module.exports = create;
