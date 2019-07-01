const request = require('request-promise');
const api = async (action, rowkey, body) => {
    let base_url = 'https://crud-api.azurewebsites.net/api/';
    
    resetOptions();

    console.log(`action: ${action} rowkey: ${rowkey} body: ${body}\n`)
    
    if(rowkey) {
        base_url += action + '/' + rowkey;
    } else {
        base_url += action;
    }

    var options;
    let data = body;

    if(action == 'create' || action == 'remove' || action == 'update') {
        let _method;
        switch(action) {
            case 'create':
                _method = 'POST';
                break;
            case 'remove':
                _method = 'DELETE';
                break;
            case 'update':
                _method = 'PUT';
                break;
        };

        console.log(`method: ${_method}`);
        
        options = {
            method: _method,
            url: base_url,
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': '04fd4903-55bd-4937-929e-e2393e6cd473'
            },
            body: body
        };
    } else {
        options = {
            url: base_url,
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': '04fd4903-55bd-4937-929e-e2393e6cd473'
            }
        };
    }

    // if(body) {
    //     options["body"] = body;
    // }

    function resetOptions() {
        options = {
            url: base_url,
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': '04fd4903-55bd-4937-929e-e2393e6cd473'
            }
        };
    }

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
