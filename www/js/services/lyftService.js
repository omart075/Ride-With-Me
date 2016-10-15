angular.module('app').factory('lyftService', function($http) {

    // returns the estamite price depending on lat and lon
    var getPrices = function(startLat, startLng, finLat, finLng) {

	return new Promise((resolve,reject) => {

	    // Query URL
	    var url = 'https://api.lyft.com/v1/cost?start_lat='
		+startLat+'&start_lng='+startLng+'&end_lat='
		+finLat+'&end_lng='+finLng;

	    // Token
	    var Token = 'Bearer gAAAAABX0EtKpHZqxOcSibZGOs3JbZVilP9EUqYEMWR2tc1R_hDRuDRYPDl797YzXmRMkhqXUNpPprK1uTmcC7pcnWrqL2bdHN34De5Pwj5jPWpb7E_6G4w6dYynjhHKSFqefFwjKBqSbAVbhxQP-fAvcT_7CbuVzfsmtX9dOfS1l-R8-4vf2ZY=';

	    // Options/Headers
	    var options = {
		headers: {
		    'Authorization': Token
		}
	    };

	    // HTTP GET CALL
	    $http.get(url,options)
		.then((res) => {
		    resolve(res.data.cost_estimates);
		});
	});
    };

    return {
	getPrices: getPrices
    };

});
