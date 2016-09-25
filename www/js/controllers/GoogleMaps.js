angular.module('app').controller('MapController', function($scope, $http, $ionicLoading) {

    // Display map
    google.maps.event.addDomListener(window, 'load', function() {
        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);

        var mapOptions = {
            center: myLatlng,
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
	
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	var geoloccontrol = new klokantech.GeolocationControl(map, 18);
	
	// Options for Autocomplete
	var options = {
	    types: ['establishment']
	};

	// User Address Autocomplete
	var address_auto_complete = document.getElementById('user.address');
	var autocomplete = new google.maps.places.Autocomplete(address_auto_complete, options).getPlace();

	// Destination Autocomplete
	var destination_auto_complete = document.getElementById('user.destination');
	var destination = new google.maps.places.Autocomplete(destination_auto_complete, options).getPlace();

	// Global Markers Array
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
	
	$scope.getPrice = function() {
	    hideMap();
	    var startLat = _markers[0].position.lat();
	    var startLng = _markers[0].position.lng();
	    var finLat = _markers[1].position.lat();
	    var finLng = _markers[1].position.lng();

	    $http({
		method: "GET",
		url: "https://crossorigin.me/http://45.55.195.49:4000/api/uber?startLat=" + startLat + "&startLng=" +
		    startLng + "&finLat=" + finLat + "&finLng=" + finLng
	    }).success((data) => {
		console.log(data);
	    });

	    $http({
		method: "GET",
		url: "https://crossorigin.me/http://45.55.195.49:4000/api/lyft?startLat=" + startLat + "&startLng=" +
		    startLng + "&finLat=" + finLat + "&finLng=" + finLng
	    }).success((data2) => {
		console.log(data2);
	    });

	};

	
	// get current positon
        $scope.getCurrentLocation = function() {
	    return new Promise ((resolve,reject) => {
		navigator.geolocation.getCurrentPosition(function(pos) {
		    map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
		    var location = {
			lat: pos.coords.latitude,
			lng: pos.coords.longitude
		    };
		    addMarker(location);
		    resolve(location);
		});
	    });
	};
	
	// Search function based on address/destination
	$scope.search = function() {

	    var link = document.getElementById('map');
	    link.style.visibility = 'visible';

	    var geocoder = new google.maps.Geocoder();
	     /*
	      * Get two pins and then calculates the 
              *  midpoint between both pins for center display
              */
	    var addressPosition;
	    var destinationPosition;
	    geocodeAddress(geocoder, map).then((addressRes) => {
		addressPosition = addressRes;
		return geocodeDestination(geocoder, map);
	    }).then((destinationRes) => {
		destinationPosition = destinationRes;
		var markers = [addressPosition, destinationPosition];
		var bounds = new google.maps.LatLngBounds();
		for(index in markers){
		    var position = markers[index];
		    bounds.extend(position);
		}
		map.fitBounds(bounds);
	    });

	};
	    // GEOCODE ADDRESS
	    function geocodeAddress(geocoder, resultsMap) {
		var address = document.getElementById('user.address').value;
		if (address == "current location" || address == "Current location"){
		    return $scope.getCurrentLocation();
		}
		return new Promise ((resolve,reject) => {
		    geocoder.geocode({'address': address}, function(results, status) {
			if (status === 'OK') {
			    addMarker(results[0].geometry.location);
			    resolve(results[0].geometry.location);
			}
			else {
			    console.log('Geocode was not successful for address because: ' + status);
			    reject(status);
			}
		    });
		});
	    };

	    // GEOCODE DESTINATION
	    function geocodeDestination(geocoder, resultsMap) {
		var destination = document.getElementById('user.destination').value;
		return new Promise((resolve, reject) => {
		    geocoder.geocode({'address': destination}, function(results, status) {
			if (status === 'OK') {
			    addMarker(results[0].geometry.location);
			    resolve(results[0].geometry.location);
			}		
			else {
			    console.log('Geocode was not successful for destination because: ' + status);
			}
		    });
		});
	    };
    });
});
