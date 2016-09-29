angular.module('app').controller('newController', function($scope, $http, $ionicLoading, uberService, lyftService, markerService, mapService) {

    // View will react to changes on the map
    google.maps.event.addDomListener(window, 'load', function() {

	// Intialize our Map Service
	var Map = new mapService.Map();
	var Markers = new markerService.Markers();
	/*
	  Get Autocompletion in View
	  @params -> HTML input tags
	*/
	Map.linkFromAddress('user.address');
	Map.linkToAddress('user.destination');


	// Create Map Initialize at Current Position
	Map.getCurrentLocation().then((location) => {
	    let options = {
		center: location,
		zoom: 17,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	    };
	    Map.create('map', options, new google.maps.Geocoder, navigator);
	});


	$scope.search = function() {
	    // Clears old data if neccessary
	    $scope.uberData = "";
	    $scope.lyftData = "";
	    // Show the Map
	    Map.showMap();

	    // Grabs the location from HTML input tags
	    var fromLocation = Map.getFromLocation();
	    var toLocation = Map.getToLocation();

      Promise.all([fromLocation, toLocation])
  .then((values) => {
      for(var i in values){
    let location = {
        lat:values[i].lat(),
        lng:values[i].lng()
    };
    Markers.addMarker(Map.getMap(),location);

      }
  }).catch((err) => {
      /* TODO
         Error Handeling goes here
         maybe we can show a pop-up dialog saying that
         something went wrong with the search ?
      */
  });

};

	// $scope.getPrice = function() {

	//     // Hide the Map
	//     Map.hideMap();

	//     var startLat = _markers[0].position.lat();
	//     var startLng = _markers[0].position.lng();
	//     var finLat = _markers[1].position.lat();
	//     var finLng = _markers[1].position.lng();

	//     // call uberService
	//     uberService.getPrices(startLat,startLng,finLat,finLng)
	// 	.then((res) => {
	// 	    console.log("uber: " + res);
	// 	});

	//     // call lyftService
	//     lyftService.getPrices(startLat,startLng,finLat,finLng)
	// 	.then((res) => {
	// 	    console.log(res);
	// 	})
	// };

	// function CenterControl(controlDiv, map) {

	//     // Set CSS for the control border.
	//     var controlUI = document.createElement('div');
	//     controlUI.style.backgroundColor = '#fff';
	//     controlUI.style.border = '2px solid #fff';
	//     controlUI.style.borderRadius = '3px';
	//     controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
	//     controlUI.style.cursor = 'pointer';
	//     controlUI.style.marginBottom = '22px';
	//     controlUI.style.textAlign = 'center';
	//     controlUI.title = 'Click to recenter the map';
	//     controlDiv.appendChild(controlUI);

	//     // Set CSS for the control interior.
	//     var controlText = document.createElement('div');
	//     controlText.style.color = 'rgb(25,25,25)';
	//     controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
	//     controlText.style.fontSize = '16px';
	//     controlText.style.lineHeight = '38px';
	//     controlText.style.paddingLeft = '5px';
	//     controlText.style.paddingRight = '5px';
	//     controlText.innerHTML = 'Center Map';
	//     controlUI.appendChild(controlText);

	//     // Setup the click event listeners: simply set the map to Chicago.
	//     controlUI.addEventListener('click', function() {
	// 	map.setCenter(chicago);
	//     });

	// }


	// // Create the DIV to hold the control and call the CenterControl()
	// // constructor passing in this DIV.
	// var centerControlDiv = document.createElement('div');
	// var centerControl = new CenterControl(centerControlDiv, map);

	// centerControlDiv.index = 1;
	// map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

	// controlUI.addEventListener('click', function() {
	//     map.setCenter(chicago);
	// });

	/*
	  Search() returns Pins on User's inserted Locations
	 */
    });
});
