const request = require('request-promise');
const api = async (action, rowkey, body) => {
    let base_url = 'https://crud-api.azurewebsites.net/api/';

    let _action = action;

    if(rowkey) {
        base_url += _action + '/' + rowkey;
    } else {
        base_url += _action;
    }

    var options = {
        url: base_url,
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': '04fd4903-55bd-4937-929e-e2393e6cd473'
        }
    };

    if(body) {
        options["body"] = body;
    }

    let _body;
    function response(error, response, body) {
        if(!error && response.statusCode == 200) {
            console.log('error code: ' + response.statusCode);
            return body;
        } else {
            return 'error'
        }
    }
   return await request(options, response); 
}

module.exports = api;
