angular.module('app').factory('markerService', function() {

    var Markers = function(map) {
        this.map = map;
	this.count = 0;
	this._markers = [];
    }

    Markers.prototype = {

        addCurrMarker: function(map, location) {
          //sets pin attributes
          function pinSymbol(color) {
               return {
                   path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
                   fillColor: color,
                   fillOpacity: 1,
                   strokeColor: '#000',
                   strokeWeight: 1,
                   scale: 1
              };
           }

            var marker = new Marker({
                map: map,
                name: "currentLocation",
                animation: google.maps.Animation.BOUNCE,
                position: location,
                icon: pinSymbol("#487DD9")
            });
            return marker;
        },

	// Adds a marker to the map and push to the array.
	addMarker: function(map, location) {
	    if(this.count == 2)
	    {
    		this.clearMarkers();
  	  }
      //sets pin attributes
      function pinSymbol(color) {
           return {
               path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
               fillColor: color,
               fillOpacity: 1,
               strokeColor: '#000',
               strokeWeight: 1,
               scale: 1
          };
       }
       //chooses color depending on which marker it is
       if(this.count == 0){
         var colorStr = "#FFF";
       }
       else{
         var colorStr = "#444";
       }
	    var marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
  		position: location,
  		draggable: true,
  		map: map,
      icon: pinSymbol(colorStr)
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
