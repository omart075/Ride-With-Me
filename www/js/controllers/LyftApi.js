// authorization
var auth = 'Bearer gAAAAABX0EtKpHZqxOcSibZGOs3JbZVilP9EUqYEMWR2tc1R_hDRuDRYPDl797YzXmRMkhqXUNpPprK1uTmcC7pcnWrqL2bdHN34De5Pwj5jPWpb7E_6G4w6dYynjhHKSFqefFwjKBqSbAVbhxQP-fAvcT_7CbuVzfsmtX9dOfS1l-R8-4vf2ZY=';

// LyftCtrl that handles API calls
angular.module('app').controller('LyftCtrl', ['$scope', '$http', function ($scope, $http) {
    
    $scope.lyft = function(startLat, startLng, finLat, finLng) {
	$http({
	    method: "GET",
	    url: 'https://api.lyft.com/v1/cost?start_lat=' + startLat + '&start_lng=' + startLng + '&end_lat=' + finLat + '&end_lng=' + finLng,
	    headers: {
		'Authorization': auth
	    }
	}).success(function (res, status, headers) {
	    console.log(res);
	});
    };
}]);

// data handling
function parseData(data) {
    return new Promise((resolve,reject) => {

	/* 
	 * manipuate data passed into the function here
	 */

	// return our data object as a promise
	resolve(/* goes here */);
    });
};