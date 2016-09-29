angular.module('app').factory('markerService', function() {
    
    var Markers = function() {
	this.count;
	this._markers = [];
    }

    Markers.prototype = {

	// Adds a marker to the map and push to the array.
	addMarker: function(map,location) {
	    if(this.count == 2) {
		this.clearMarkers();
		this.deleteMarkers();
	    }
	    var marker = new google.maps.Marker({
		position: location,
		draggable: true,
		map: map
	    });
	    this._markers.push(marker);
	    this.count++;
	    return marker;
	},
	
	// Sets the map on all markers in the array.
	setMapOnAll: function(map) {
	    for (var i = 0; i < _markers.length; i++) {
		_markers[i].setMap(map);
	    }
	},

	// Removes the markers from the map, but keeps them in the array.
	clearMarkers: function() {
	    setMapOnAll(null);
	},

	// Shows any markers currently in the array.
	showMarkers: function() {
	    setMapOnAll(map);
	},

	// Deletes all markers in the array by removing references to them.
	deleteMarkers: function() {
	    clearMarkers();
	    _markers = [];
	},

	getMarkerLocation: function() {
	    for(i in _markers){
		console.log(_markers[i].position);
	    }
	}
    };

    return {
	Markers:Markers
    };
});
