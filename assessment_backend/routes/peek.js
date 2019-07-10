const api = require('../db/api');

const peek = async (req, res) => {
    const dataApi = await api('peek');
    let json = JSON.parse(dataApi);
    res.send(json);
    /* All this code moved to front end for parsing the data
    // let front_json = [];

    // for(var i = 0; i < json.message.length; i++) {
    //     front_json[i] = {
    //         date: `${json.message[i].name}T00:00:00.0000Z`,
    //         events: json.message[i].data.events
    //     };
    // }
    */
}

module.exports = peek;