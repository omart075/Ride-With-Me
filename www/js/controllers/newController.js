angular.module('app').controller('newController', function($scope, $http, $ionicLoading, uberService, lyftService, markerService, controlService, mapService) {


    // Intialize our Map Service
    var Map = new mapService.Map();
    var Markers = new markerService.Markers();
    var Control = new controlService.Control();
    
    // View will react to changes on the map
    google.maps.event.addDomListener(window, 'load', function() {
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

	    /**************************** Buttons Go here ****************************/
	    // Create the DIV to hold the control and call the CenterControl()
	    // constructor passing in this DIV.
	    var chicagoDiv = document.createElement('div');
	    var chicagoButton = Control.createExample(chicagoDiv, Map.getMap());
	    Map.getMap().controls[google.maps.ControlPosition.TOP_CENTER].push(chicagoDiv);
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
			Map.fitBounds(Markers.getMarkers());
		    }
		}).catch((err) => {
		    /* TODO
		       Error Handeling goes here
		       maybe we can show a pop-up dialog saying that
		       something went wrong with the search ?
		    */
		});
	    // Fit the Map to the markers bounds.
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
