var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 4000;
var API = require('./www/js/controllers/ApiCalls.js');

app.get('/api/uber?', function(req,res) {
    API.uber(req.query.startLat, req.query.startLng,
	     req.query.finLat, req.query.finLng).then((data) => {
		 res.setHeader('Content-Type', 'application/json');
		 data = JSON.parse(data);
    		 res.send(JSON.stringify(data,null,4));
	     });
});


app.get('/api/lyft?', function(req,res) {
    API.lyft(req.query.startLat, req.query.startLng,
	     req.query.finLat, req.query.finLng).then((data) => {
		 res.setHeader('Content-Type', 'application/json');
		 data = JSON.parse(data);
    		 res.send(JSON.stringify(data,null,4));
	     });
});


// Start App
app.listen(port, function() {
    console.log('Listening on port ' + port);
});
