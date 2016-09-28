angular.module('app').factory('uberService', function($http) {
  
    // returns the estamite price depending on lat and lon
    var getPrices = function(startLat, startLng, finLat, finLng) {
	
	return new Promise((resolve,reject) => {
	    
	    // Query URL 
	    var url = 'https://api.uber.com/v1/estimates/price?start_latitude='
		+startLat+'&start_longitude='+startLng+'&end_latitude='
		+finLat+'&end_longitude='+finLng;

	    // Token
	    var Token = 'Token Xqf0ZY_v87Xz-T8_ihk22lzReP2qSm0VLtib9QW6';

	    // Options/Headers
	    var options = {
		headers: {
		    'Authorization': Token
		}
	    };

	    // HTTP GET CALL
	    $http.get(url,options)
		.then((res) => {
		    resolve(res.prices);
		});
	});
    };

    return {
	getPrices: getPrices
    };
    
});
