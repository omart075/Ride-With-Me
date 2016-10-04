angular.module('app').factory('markerService', function() {

    var Markers = function() {
	this.count = 0;
	this._markers = [];
    }

    Markers.prototype = {

	// Adds a marker to the map and push to the array.
	addMarker: function(map,location) {
	    if(this.count == 2)
	    {
    		//this.clearMarkers();
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
	    console.log("SetMapOnAll")
	    for (var i = 0; i < this._markers.length; i++) {
		this._markers[i].setMap(map);
	    }

	},

	// Removes the markers from the map, but keeps them in the array.
	clearMarkers: function() {
	    this.count = 0;
	    this.setMapOnAll(null);
	},

	// Shows any markers currently in the array.
	showMarkers: function() {
	    setMapOnAll(map);
	},
	// Deletes all markers in the array by removing references to them.
	deleteMarkers: function() {
	    //console.log("deleteMarkers");
	    this.clearMarkers();
	    _markers = [];
	},

	getMarkers: function()
	{
	    return this._markers;
	},

	getMarkerLocation: function() {
	    for(i=0; i<this._markers.length;i++){
	    }
	}
    };


    return {
	Markers:Markers
    };
});
