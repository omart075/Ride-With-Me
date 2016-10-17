angular.module('app').factory('markerService', function() {

    var Markers = function(map) {
        this.map = map;
	this.count = 0;
	this._markers = [];
    }

    Markers.prototype = {

        addCurrMarker: function(map, location) {

            var marker = new Marker({
                map: map,
                name: "currentLocation",
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

        setMapOnAll: function(map) {
            for (var i = 0; i < this._markers.length; i++) {
                this._markers[i].setMap(map);
                console.log("marker should be gone");
            }
        },

	// Removes the markers from the map, but keeps them in the array.
	clearMarkers: function() {
            this.setMapOnAll(null);
	    this.count = 0;
            this._markers = [];
	},

        // TODO Does not work
	// // Shows any markers currently in the array.
	// showMarkers: function() {
	//     setMapOnAll(map);
	// },

	getMarkers: function()
	{
	    return this._markers;
	},

	getMarkerLocation: function() {

	},

        getCount: function() {
            return this.count;
        },

        isUnique: function(location) {

            let lat = location.lat;
            let lng = location.lng;

            for(m in this._markers) {
                let otherLat = this._markers[m].position.lat();
                let otherLng = this._markers[m].position.lng();
                if(otherLat == lat && otherLng == lng) {
                    return false;
                }
            }
            return true;
        }
    };


    return {
	Markers:Markers
    };
});
