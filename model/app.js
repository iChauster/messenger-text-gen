const login = require("facebook-chat-api");
const fs = require("fs")
const dotenv = require('dotenv');
const chalk = require('chalk')

dotenv.config();

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
    	console.log(history)
    	console.log(chalk`travelling to {yellow.italic ${timestamp}} time`)
    	console.log(chalk`fetching {bold.green ${batchSize}} messages`)
        if(err) {
        	let errString = `Amount of messages remaining: ${amtRemaining}.\nMost recent timestamp: ${timestamp}\nError from API: ${err}.`
        	console.error(errString)
        	fs.writeFileSync('err.txt', errString);
        	return;
        }

        console.log(chalk.green.bold(`Successfully loaded ${batchSize} messages!`))

        if(timestamp != undefined) history.pop();

        history.forEach( (message) => {
        	if (message.type == "message"){
        		if(message.body != '' || message.body.includes('http') == false){
	        		fs.appendFile(`./data/${message.senderID}.txt`, `\n${message.body}`, (err) => {
	        			if(err) console.error(chalk.red(`Filesystem error: ${err}`))
	        			return;
	        		})
        		}

        	}
        });

        latestTimestamp = history[0]["timestamp"] 

        // Sleep to avoid spam

		return setTimeout(loadMessages, 5000, api, latestTimestamp, amtRemaining - batchSize, batchSize);
    });

}






loginWithCredentials((api) => {

	console.log(api)
	loadMessages(api, timestamp=null, amtRemaining=50, batchSize=50)
});


