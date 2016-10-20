angular.module('app').factory('uberService', function($http) {

    // returns the estamite price depending on lat and lon
    var getPrices = function(startLat, startLng, finLat, finLng) {

	return new Promise((resolve,reject) => {

	    // Query URL
	    var url = 'https://api.uber.com/v1/estimates/price?start_latitude='
		+startLat+'&start_longitude='+startLng+'&end_latitude='
		+finLat+'&end_longitude='+finLng;

	    // Token
	    var Token = 'Token wO39e78Ze5SPZ6DU35beGL4HZ_2XdfuelQW2kiAW'

	    // Options/Headers
	    var options = {
		headers: {
		    'Authorization': Token
		}
	    };

	    // HTTP GET CALL
	    $http.get(url,options)
		.then((res) => {
		    resolve(res);
        console.log(res.data.prices[0]);
		});
	});
    };

    return {
	getPrices: getPrices
    };

});
