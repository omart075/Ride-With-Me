// authorization
var auth = 'Token Xqf0ZY_v87Xz-T8_ihk22lzReP2qSm0VLtib9QW6';

// UberCtrl that handles API calss
angular.module('app').controller('UberCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.uber= function(startLat, startLng, finLat, finLng) {
	$http({
	    method: "GET",
	    url: 'https://api.uber.com/v1/estimates/price?start_latitude=' + startLat +
		'&start_longitude=' + startLng + '&end_latitude=' + finLat +
		'&end_longitude=' + finLng,
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
