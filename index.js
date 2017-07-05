const path = require('path');
const express = require('express');
const request = require('request');
const app = express();

const PORT_NUMBER = 8080;
const GOOGLE_KEY = 'AIzaSyABCvs2XAvZNrltqvmr_Hea-uF6o1sF2-8';
const NERABY_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/templates/mymap.html'));
});

app.get('/nearby_search', function(req, api_res){
	var radius = req.query.radius ? req.query.radius : 150;
	var params = {
		'key': GOOGLE_KEY,
		'location': req.query.location,
		'radius': radius,
		'type': req.query.type
	};
	request({url: NERABY_SEARCH_URL, qs: params}, function(err, res, body){
		if(res.statusCode == 200){
			api_res.json(body);
		}else{
			//err handler
		}
	});
});

app.use('/css',express.static('css'));
app.use('/js',express.static('js'));

app.listen(PORT_NUMBER, function () {
    console.log('Example app listening on port %s!', PORT_NUMBER);
});
