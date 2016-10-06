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
		center: location,        // Centers at current location
		zoom: 17,                // Defaults to a zoom level of 17
    mapTypeControlOptions: { // Changes the Map type control to the bottom
              position: google.maps.ControlPosition.LEFT_BOTTOM
          },
		mapTypeId: google.maps.MapTypeId.ROADMAP // Defaults the Map type to ROAD MAP
	    };
	    Map.create('map', options, new google.maps.Geocoder, navigator);

      // Get and push the search bars into the google maps controls
      var searchBars = document.getElementById("searchBars");
      var prices = document.getElementById("prices");
      Map.getMap().controls[google.maps.ControlPosition.TOP_CENTER].push(searchBars);
      Map.getMap().controls[google.maps.ControlPosition.LEFT_BOTTOM].push(prices);
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



	$scope.getPrice = function() {

	     // Hide the Map
	     //Map.hideMap();

      var _markers = Markers.getMarkers();
	    var startLat = _markers[0].getPosition().lat();
	    var startLng = _markers[0].getPosition().lng();
	    var finLat = _markers[1].getPosition().lat();
	    var finLng = _markers[1].getPosition().lng();

	  //   // call uberService
	  //   uberService.getPrices(startLat,startLng,finLat,finLng)
		// .then((res) => {
		//     console.log("uber: " + res);
		// });

	    // call lyftService
	    lyftService.getPrices(startLat,startLng,finLat,finLng)
		.then((data) => {
		    console.log(data[0]);
        $scope.res = data;
		})
	};

    });
});
