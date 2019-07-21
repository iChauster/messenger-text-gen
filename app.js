const login = require("facebook-chat-api");
const fs = require("fs")
const dotenv = require('dotenv');

dotenv.config();

var timestamp = undefined;

function loginWithCredentials(usn, psw) {
	login({email:usn, password:psw}, (err, api) => {
		if(err) return console.error(err);

		fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()))

		return api
	});
}

function loginWithAppState(){
	login({
		appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8')),
		}, (err,api) => {

		if (err) return console.error(err)

		return api;

	});
}

function loadNextThreadHistory(api){
    api.getThreadHistory(process.env.THREAD_ID, 50, timestamp, (err, history) => {
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

api = loginWithCredentials(process.env.USERNAME, process.env.PASSWORD);
console.log(api)