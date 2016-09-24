// TaxiCtrl that handles API calss

// authorization

var auth = 'Token Xqf0ZY_v87Xz-T8_ihk22lzReP2qSm0VLtib9QW6';

angular.module("Ride-With-Me").controller('TaxiCtrl', [$scope, $http, function ($scope, $http) {

    $scope.taxi= function(city, startLat, startLng, finLat, finLng) {
  $http({
  	  method: "GET",
      url: 'https://api.taxifarefinder.com/fare?
    key=<TFF API KEY>
    &entity_handle=' + city +
    '&origin=' + startLat + ',' + startLng +
    '&destination=' + finLat + ',' + finLng,
  	  headers: {
  		      'Authorization': auth
  	    }
  }).success(function (res, status, headers) {
  	  console.log(res);
  });
    };
}]);
