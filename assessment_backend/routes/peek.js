const api = require('../db/api');

const peek = async (req, res) => {
    const dataApi = await api('peek');
    let json = JSON.parse(dataApi);
    // console.log(json.message[0].data.events); debugging statement
    // for(var i = 0; i < json.message.length; i++) {
        //future loop that will be needed
    // }

    let front_end_json = {
        date: `${json.message[0].name}` + "T00:00:00.0000Z",
        events: json.message[0].data.events
    }
    console.log(front_end_json)
    res.send(front_end_json);
}

module.exports = peek;