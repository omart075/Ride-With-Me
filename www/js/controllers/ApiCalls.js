// HTTP Request
var https = require('https');

function uber(startLat, startLng, finLat, finLng) {

    return new Promise((resolve,reject) => { 
	https.get({
	    host: 'api.uber.com',
	    path: '/v1/estimates/price?start_latitude=' + startLat +
		'&start_longitude=' + startLng + '&end_latitude=' + finLat +
		'&end_longitude=' + finLng,
	    headers: {
		'Authorization': 'Token Xqf0ZY_v87Xz-T8_ihk22lzReP2qSm0VLtib9QW6'
	    }
	}, (res) => {
	    var data = '';
    	    res.on('data', function(response) {
		data += response
    	    });
    	    res.on('end', function() {
		resolve(data);
    	    });
	});
    });
};
		       

function lyft(startLat, startLng, finLat, finLng) {

    var auth = 'Bearer gAAAAABX0EtKpHZqxOcSibZGOs3JbZVilP9EUqYEMWR2tc1R_hDRuDRYPDl797YzXmRMkhqXUNpPprK1uTmcC7pcnWrqL2bdHN34De5Pwj5jPWpb7E_6G4w6dYynjhHKSFqefFwjKBqSbAVbhxQP-fAvcT_7CbuVzfsmtX9dOfS1l-R8-4vf2ZY=';

    return new Promise ((resolve,reject) => {
	https.get({
    	    host: 'api.lyft.com',
    	    path: '/v1/cost?start_lat=' + startLat + '&start_lng=' + startLng + '&end_lat=' + finLat + '&end_lng=' + finLng,
    	    headers: {
		'Authorization': auth
    	    }
	}, (res) => {
    	    var data = '';
    	    res.on('data', function(response) {
		data += response
    	    });
    	    res.on('end', function() {
		resolve(data);
    	    });
	});
    });
};

module.exports = {
    uber:uber,
    lyft:lyft
}
