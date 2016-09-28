angular.module('app').controller('newController', function($scope, $http, $ionicLoading, uberService, lyftService, mapService) {

    // View will react to changes on the map
    google.maps.event.addDomListener(window, 'load', function() {

	// Intialize our Map Service
	var Map = new mapService.Map('map');

	/*
	  Get Autocompletion in View
	  @params -> HTML input tags
	*/
	Map.linkFromAddress('user.address');
	Map.linkToAddress('user.destination');

	/*
	  Enable GEO-Services 
	  @params -> provided by GoogleAPI
	 */
	Map.setGeocoder(new google.maps.Geocoder());
	Map.setNavigator(navigator);
	
	// Create Map
	Map.create();

	/*
	  Search() returns Pins on User's inserted Locations
	 */
	$scope.search = function() {
	    // Clears old data if neccessary
	    $scope.uberData = "";
	    $scope.lyftData = "";

	    // Show the Map
	    Map.showMap();

	    // Grabs the location from HTML input tags
	    Map.getFromLocation()
		.then((fromLocation) => {
		    console.log(fromLocation);
		    return Map.getToLocation();
		}).then((toLocation) => {
		    console.log(toLocation);
		});
	    // We would now create the pins.. haven't done that yet.
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

    });
});

/* 	// Global Markers Array
	var _markers = [];

	// Adds a marker to the map and push to the array.
	function addMarker(location) {
	    if(_markers.length == 2) {
		clearMarkers();
		deleteMarkers();
	    }
	    var marker = new google.maps.Marker({
		position: location,
		draggable: true,
		map: map
	    });
	    _markers.push(marker);
	};

	// Sets the map on all markers in the array.
	function setMapOnAll(map) {
	    for (var i = 0; i < _markers.length; i++) {
		_markers[i].setMap(map);
	    }
	};

	// Removes the markers from the map, but keeps them in the array.
	function clearMarkers() {
	    setMapOnAll(null);
	};

	// Shows any markers currently in the array.
	function showMarkers() {
	    setMapOnAll(map);
	};

	// Deletes all markers in the array by removing references to them.
	function deleteMarkers() {
	    clearMarkers();
	    _markers = [];
	};

	function getMarkerLocation() {
	    for(i in _markers){
		console.log(_markers[i].position);
	    }
	};

	function hideMap() {
	    var link = document.getElementById('map');
	    link.style.visibility = 'hidden';
	};

*/
