var express = require('express');
var router = express.Router();
const login = require("facebook-chat-api");
const fs = require("fs")

var timestamp = undefined;

var everything = {

}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getMessages', function(req,res,next){

	login(/*{appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}*/{email: "6099178864", password: "function(){};"}, (err, api) => {
    if(err) return console.error(err);

    	loadNextThreadHistory(api, res);

    	fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));

    	res.setHeader('Content-Type', 'application/json');
		res.status(200).json(JSON.stringify(everything))


	});

	//res.send("hello")

})

function loadNextThreadHistory(api, res){
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

        everything = { history }

		console.log(everything)

		


    });

}

module.exports = router;
