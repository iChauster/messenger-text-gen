const login = require("facebook-chat-api");
const fs = require("fs")
const dotenv = require('dotenv');

dotenv.config();

var timestamp = undefined;

function loginWithCredentials(usn, psw, method) {
	login({email:usn, password:psw}, (err, api) => {
		if(err) return console.error(err);

		fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()))

		return method(api);
	});
}

function loginWithAppState(method){
	login({
		appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8')),
		}, (err,api) => {

		if (err) return console.error(err)

		return method(api)

	});
}

function loadMessages(api, timestamp, amtRemaining, batchSize){
	
	if (amtRemaining <= 0) return;
    
    api.getThreadHistory(process.env.THREAD_ID, batchSize, timestamp, (err, history) => {
        if(err) {
        	let errString = `Amount of messages remaining: ${amtRemaining}. 
        	\nMost recent timestamp: ${timestamp}\n
        	Error from API: ${err}`
        	console.error(errString)
        	fs.writeFileSync('err.txt', errString);
        }

        if(timestamp != undefined) history.pop();

        history.forEach( (message) => {
        	if (message.type == "message"){
        		fs.appendFile(`/data/${message.senderID}.txt`, message.body, (err) => {
        			console.err(`Filesystem error: {err}`)
        		})
        	}
        });

        latestTimestamp = history[history.length - 1]["timestamp"] 

        // Might want some sort of sleep function here to avoid spam
        
		return loadMessages(api, latestTimestamp, amtRemaining - batchSize, 50)
    });

}
/*
loginWithCredentials(process.env.USERNAME, process.env.PASSWORD, (api) => {
	console.log(api)
	loadMessages(api, null, 1000, 50)
});
*/
