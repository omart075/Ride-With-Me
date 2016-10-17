angular.module('app').factory('markerService', function() {

    var Markers = function() {
	this.count = 0;
	this._markers = [];
    }

    Markers.prototype = {

        addCurrMarker: function(map, location) {

            var marker = new Marker({
                map: map,
                position: location,
                icon: {
                    path: SQUARE_ROUNDED,          
                    fillColor: '#000000',
                    fillOpacity: 0,
                    strokeColor: '#FFFFFF',
                    strokeWeight: 0,
                    draggable: false
                },
                map_icon_label: '<span class="map-icon map-icon-circle"></span>'
            });
            return marker;
        },

	// Adds a marker to the map and push to the array.
	addMarker: function(map, location) {
	    if(this.count == 2)
	    {
    		this.clearMarkers();
  	    }
	    var marker = new google.maps.Marker({
  		position: location,
  		draggable: true,
  		map: map
  	    });
	    this._markers.push(marker);
	    this.count = this.count + 1;
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
            _markers = [];
	    this.setMapOnAll(null);
	},

	// Shows any markers currently in the array.
	showMarkers: function() {
	    setMapOnAll(map);
	},

	getMarkers: function()
	{
	    return this._markers;
	},

	getMarkerLocation: function() {
//	    for(i=0; i<this._markers.length;i++){
//	    }
	},

        getCount: function() {
            return this.count;
        }
    };


    return {
	Markers:Markers
    };
});
