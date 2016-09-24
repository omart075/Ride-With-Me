angular.module('app').controller('MapController', function($scope, $ionicLoading) {

    google.maps.event.addDomListener(window, 'load', function() {
        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);

        var mapOptions = {
            center: myLatlng,
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

	var map = new google.maps.Map(document.getElementById("map"), mapOptions);

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

        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
        });
        $scope.map = map;
    });
});


