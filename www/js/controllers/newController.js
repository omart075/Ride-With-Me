angular.module('app').controller('newController', function($scope, $http, $ionicLoading, $window,uberService, lyftService, markerService, controlService, mapService) {


    // Intialize our Map Service
    var Map = new mapService.Map();
    var Markers = new markerService.Markers(Map);
    var Control = new controlService.Control();


    // View will react to changes on the maps
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
                disableDefaultUI: true,
                mapTypeControlOptions: { // Changes the Map type control to the bottom
                    position: google.maps.ControlPosition.LEFT_BOTTOM
                },
		mapTypeId: google.maps.MapTypeId.ROADMAP // Defaults the Map type to ROAD MAP
	    };
	    Map.create('map', options, new google.maps.Geocoder, navigator);
            Markers.addCurrMarker(Map.getMap(),location);
            // Get and push the search bars into the google maps controls
            var searchBars = document.getElementById("searchBars");
            var prices = document.getElementById("prices");

            Map.getMap().controls[google.maps.ControlPosition.TOP_CENTER].push(searchBars);

            if(!ionic.Platform.is('browser'))
            navigator.splashscreen.hide();

            Map.getMap().controls[google.maps.ControlPosition.BOTTOM_CENTER].push(prices);
        });


	$scope.search = function() {


            // Grabs the location from HTML input tags
            Map.getFromLocation()
                .then((response) => {

                    let location = {
                        lat:response.lat(),
                        lng:response.lng()
                    };

                    if(Markers.isUnique(location))
                        Markers.addMarker(Map.getMap(), location);

                    else if(!Markers.isUnique(location) && Markers.getCount() == 2)
                        Markers.addMarker(Map.getMap(), location);

                    Map.fitBounds(Markers.getMarkers());
                    return Map.getToLocation();
                }).catch((err) => {
                    // Use current location (from is blank)
                    return Map.getToLocation();
                }).then((response2) => {


                    let location = {
                        lat:response2.lat(),
                        lng:response2.lng()
                    };
                    if(Markers.isUnique(location))
                        Markers.addMarker(Map.getMap(), location);

                    else if(!Markers.isUnique(location) && Markers.getCount() > 0)
                        Markers.addMarker(Map.getMap(), location);

                    Map.fitBounds(Markers.getMarkers());
                    $scope.res = null;
                    $scope.$apply();

                }).catch((err) => {
                    // MEANS DESTINATION IS NOT FILLED
                });
                //Erase the response array and apply the view

	};


	$scope.getPrice = function() {
	    // Hide the Map
	    //Map.hideMap();
      $scope._markers = Markers.getMarkers();
	    var startLat = $scope._markers[0].getPosition().lat();
	    var startLng = $scope._markers[0].getPosition().lng();
	    var finLat = $scope._markers[1].getPosition().lat();
	    var finLng = $scope._markers[1].getPosition().lng();
	      // call uberService
	      uberService.getPrices(startLat,startLng,finLat,finLng)
        //$scope.startLat = str
	    .then((res) => {
        $scope.uberData = res.data.prices;
        $scope.$apply();
	        //console.log("uber: " + res.prices[0]);
          //console.log("uber: " + res.data.prices[0]);
	    });

	    // call lyftService

	    lyftService.getPrices(startLat,startLng,finLat,finLng)
		.then((data) => {
                    for (x=0;x<data.length;x++)
                    {
                        if (data[x].ride_type == "lyft_line")
                        {
                            data[x].ride_type="Lyft Line";
                        }
                        if (data[x].ride_type == "lyft_plus")
                        {
                            data[x].ride_type="Lyft Plus"
                        }
                        if (data[x].ride_type== "lyft")
                        {
                            data[x].ride_type="Lyft";
                        }
                    }
            $scope.res = data;
            $scope.$apply();

		})





	};



    });



    // $scope.onSwipeDown = function()
    // {
    //       console.log("swipedDown");
    //       $scope.draggedStyle = {
    //         'left': event.gesture.center.pageX + 'px',
    //         'top': event.gesture.center.pageY + 'px'
    //     };
    //
    // }
    $scope.alert = function(data){
      var startLat = $scope._markers[0].getPosition().lat();
      var startLng = $scope._markers[0].getPosition().lng();
      var finLat = $scope._markers[1].getPosition().lat();
      var finLng = $scope._markers[1].getPosition().lng();
      var ridetype = data.ride_type;
      if(ridetype != null){
        if(ridetype == "Lyft Plus"){
          ridetype = "lyft_plus";
        }
        else if (ridetype == "Lyft Line") {
          ridetype = "lyft_line";
        }
        else{
          ridetype= "lyft";
        }
      }
      var lyftDeepLinking = "lyft://ridetype?id="+ridetype+"&pickup[latitude]="+startLat
        +"&pickup[longitude]="+startLng+"&destination[latitude]="+finLat+
        "&destination[longitude]="+finLng;

      $window.location.href = lyftDeepLinking;

        console.log(lyftDeepLinking);
        console.log(data);


    };


});
