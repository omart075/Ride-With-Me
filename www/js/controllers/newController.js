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
  var mapStyle = [
    {
        "featureType": "all",
        "stylers": [
            {
                "saturation": 0
            },
            {
                "hue": "#e7ecf0"
            }
        ]
    },
    {
        "featureType": "road",
        "stylers": [
            {
                "saturation": -70
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "saturation": -60
            }
        ]
    }
  ];

	// Create Map Initialize at Current Position
	Map.getCurrentLocation().then((location) => {
            let options = {
		            center: location,        // Centers at current location
		            zoom: 17,                // Defaults to a zoom level of 17
                disableDefaultUI: true,
                mapTypeControlOptions: { // Changes the Map type control to the bottom
                    position: google.maps.ControlPosition.LEFT_BOTTOM,
                    mapTypeIds: google.maps.MapTypeId.ROADMAP// Defaults the Map type to ROAD MAP
                },
                styles: mapStyle
		//mapTypeId: google.maps.MapTypeId.ROADMAP
	    };
	    Map.create('map', options, new google.maps.Geocoder, navigator);
            Markers.addCurrMarker(Map.getMap(),location);
            // Get and push the search bars into the google maps controls
            var searchBars = document.getElementById("searchBars");
            var prices = document.getElementById("prices");
            var pricesButton = document.getElementById("prices-button");
            var searchButton = document.getElementById("search-button");
            console.log(pricesButton);
            Map.getMap().controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(pricesButton);
            Map.getMap().controls[google.maps.ControlPosition.LEFT_BOTTOM].push(searchButton);


            Map.getMap().controls[google.maps.ControlPosition.TOP_CENTER].push(searchBars);

            if(!ionic.Platform.is('browser'))
            navigator.splashscreen.hide();

            Map.getMap().controls[google.maps.ControlPosition.BOTTOM_CENTER].push(prices);

            //should bring buttons back when map is clicked
            Map.getMap().addListener('click', function() {

              document.getElementsByClassName('carItem')[0].style.animation = "slideOutDown 700ms";
              document.getElementsByClassName('carItem')[1].style.animation = "slideOutDown 700ms";
              document.getElementsByClassName('carItem')[2].style.animation = "slideOutDown 700ms";
              document.getElementsByClassName('carItem')[3].style.animation = "slideOutDown 700ms";
              document.getElementsByClassName('carItem')[4].style.animation = "slideOutDown 700ms";
              document.getElementsByClassName('carItem')[5].style.animation = "slideOutDown 700ms";

              document.getElementsByClassName('carItem')[0].addEventListener('webkitAnimationEnd',function( event ) {    document.getElementsByClassName('carItem')[0].style.display = 'none'; }, false);
              document.getElementsByClassName('carItem')[1].addEventListener('webkitAnimationEnd',function( event ) {    document.getElementsByClassName('carItem')[1].style.display = 'none'; }, false);
              document.getElementsByClassName('carItem')[2].addEventListener('webkitAnimationEnd',function( event ) {    document.getElementsByClassName('carItem')[2].style.display = 'none'; }, false);
              document.getElementsByClassName('carItem')[3].addEventListener('webkitAnimationEnd',function( event ) {    document.getElementsByClassName('carItem')[3].style.display = 'none'; }, false);
              document.getElementsByClassName('carItem')[4].addEventListener('webkitAnimationEnd',function( event ) {    document.getElementsByClassName('carItem')[4].style.display = 'none'; }, false);
              document.getElementsByClassName('carItem')[5].addEventListener('webkitAnimationEnd',function( event ) {    document.getElementsByClassName('carItem')[5].style.display = 'none'; }, false);

            });
            //should bring buttons back when map is dragged
            Map.getMap().addListener('drag', function() {
              document.getElementsByClassName('carItem')[0].style.animation = "slideOutDown 700ms";
              document.getElementsByClassName('carItem')[1].style.animation = "slideOutDown 700ms";
              document.getElementsByClassName('carItem')[2].style.animation = "slideOutDown 700ms";
              document.getElementsByClassName('carItem')[3].style.animation = "slideOutDown 700ms";
              document.getElementsByClassName('carItem')[4].style.animation = "slideOutDown 700ms";
              document.getElementsByClassName('carItem')[5].style.animation = "slideOutDown 700ms";

              document.getElementsByClassName('carItem')[0].addEventListener('webkitAnimationEnd',function( event ) {    document.getElementsByClassName('carItem')[0].style.display = 'none'; }, false);
              document.getElementsByClassName('carItem')[1].addEventListener('webkitAnimationEnd',function( event ) {    document.getElementsByClassName('carItem')[1].style.display = 'none'; }, false);
              document.getElementsByClassName('carItem')[2].addEventListener('webkitAnimationEnd',function( event ) {    document.getElementsByClassName('carItem')[2].style.display = 'none'; }, false);
              document.getElementsByClassName('carItem')[3].addEventListener('webkitAnimationEnd',function( event ) {    document.getElementsByClassName('carItem')[3].style.display = 'none'; }, false);
              document.getElementsByClassName('carItem')[4].addEventListener('webkitAnimationEnd',function( event ) {    document.getElementsByClassName('carItem')[4].style.display = 'none'; }, false);
              document.getElementsByClassName('carItem')[5].addEventListener('webkitAnimationEnd',function( event ) {    document.getElementsByClassName('carItem')[5].style.display = 'none'; }, false);

            });
        });
  //detects if user clicked on an autocomplete option
  //parameter passed is the id of search box calling the functions
  $scope.clicked = function(element){
    var input = document.getElementById(element);
    var autocomplete = new google.maps.places.Autocomplete(input);
     google.maps.event.addListener(autocomplete, 'place_changed', function () {
        console.log("clicked");
       });
  };
  // detects if user pressed enter key and then mimics arrow down and enter to select first
  // autocomplete option
  //parameter passed is the id of search box calling the functions
  $scope.enterMod = function(element){
    var input = document.getElementById(element);
    google.maps.event.addDomListener(input,'keydown',function(e){
       if(e.keyCode===13 && !e.triggered){
         google.maps.event.trigger(this,'keydown',{keyCode:40})
         google.maps.event.trigger(this,'keydown',{keyCode:13,triggered:true})
       }
  });
  };
  // detects if user pressed enter key
  //parameter passed is the id of search box calling the functions
  $scope.enter = function(){
    document.getElementById('user.address').onkeypress = function(e) {
    if(e.keyCode == 13) {
        console.log('You pressed enter!');
    }
  }
  };
  //blurs entire map; have to figure out how to blur certain components
  //since everything is pushed onto map
  $scope.blur =  function(){
    document.getElementById('map').setAttribute("style","-webkit-filter:blur(5px)");
  };

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


	$scope.getPrices = function() {
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

  //fades out buttons when prices is clicked
  $scope.hideButtons = function(){
      //  document.getElementById('search-button').style.visibility = "hidden";
      //  document.getElementById('prices-button').style.visibility = "hidden";
    document.getElementById('search-button').style.animation = "fadeOut 700ms";
    document.getElementById('prices-button').style.animation = "fadeOut 700ms";


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
    $scope.parse = function(data){
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
        var lyftDeepLinking = "lyft://ridetype?id="+ridetype+"&pickup[latitude]="+startLat
          +"&pickup[longitude]="+startLng+"&destination[latitude]="+finLat+
          "&destination[longitude]="+finLng;
          console.log(lyftDeepLinking);
          window.open(lyftDeepLinking,'_system', 'location=no');

      }
      else{
        product_id = data.product_id;
        var uberDeepLinking = "uber://?client_id=YOUR_CLIENT_ID&action=setPickup&pickup[latitude]="
          +startLat+"&pickup[longitude]="+startLng+"&dropoff[latitude]="+finLat
          +"&dropoff[longitude]="+finLng+"&product_id="
          + product_id+"&link_text=View%20team%20roster&partner_deeplink=partner%3A%2F%2Fteam%2F9383";
          console.log(uberDeepLinking);
          window.open(uberDeepLinking,'_system', 'location=no');
      }







    };


    $scope.disableTap = function(){
        container = document.getElementsByClassName('pac-container');
        // disable ionic data tab
        angular.element(container).attr('data-tap-disabled', 'true');
        // leave input field if google-address-entry is selected
        angular.element(container).on("click", function(){
            document.getElementById('user.address').blur();
        });
};

    })
