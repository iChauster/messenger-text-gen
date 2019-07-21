var express = require('express');
var router = express.Router();
const login = require("facebook-chat-api");
const fs = require("fs")

var timestamp = undefined;


login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}/*{email: "pubjee1@gmail.com", password: "asdf5608"}*/, (err, api) => {
    if(err) return console.error(err);

    	loadNextThreadHistory(api);

    	fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));


});


function loadNextThreadHistory(api){
    api.getThreadHistory("1684465761646373", 50, timestamp, (err, history) => {
        if(err) return console.error(err);

        /*
            Since the timestamp is from a previous loaded message,
            that message will be included in this history so we can discard it unless it is the first load.
        */
        if(timestamp != undefined) history.pop();

        /*
            Handle message history



        */

        timestamp = history[0].timestamp;


		console.log(history[0].timestamp)

		


    });

}

module.exports = router;
