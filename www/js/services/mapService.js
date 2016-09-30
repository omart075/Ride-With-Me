angular.module('app').factory('mapService', function(){

    var Map = function() {

	/*********************************** Map Properties ***********************************/
	// HTML Element id
	this.id;

	// Map object
	this.map;

	// default mapOptions
	this.mapOptions;

	// autocomplete Options (leave blank)
	this.autocompleteOptions;

	// grabs the input tags by id
	this.fromAddress;
	this.toAddress;

	// has to be set before getting any location!
	this.geocoder;
	this.navigator;
    }

    Map.prototype = {

	constructor:Map,

	/*********************************** Setters & Getters ***********************************/
	/*
	  This is the same as id in html
	  - Never likely going to be changed -
	 */
	setId:  function(id) {
	    this.id = id;
	},


	getId: function() {
	    return this.id;
	},

	getMap: function() {
	    return this.map;
	},
	/*
	  Can be changed from default values
	*/
	setMapOptions: function(options) {
	    this.MapOptions = options;
	},

	getMapOptions: function() {
	    return this.mapOptions;
	},

	/*
	  Setter for Auto Complete Options
	   - Should be an empty Object -
	 */
	setAutoCompleteOptions: function(options) {
	    this.autocompleteOptions = options;

	},

	getAutoCompleteOptions: function() {
	    return this.autocompleteOptions;
	},

	/*
	  Points to the HTML from-address tag
	  - Needs to be set to see AutoCompletion -
	 */
	linkFromAddress: function(address) {
	    this.fromAddress = document.getElementById(address);
	    return new google.maps.places.Autocomplete(this.fromAddress, this.autocompleteOptions).getPlace();
	},

	/*
	  Points to the HTML to-address tag
	  - Needs to be set to see AutoCompletion -
	 */
	linkToAddress: function(address) {
	    this.toAddress = document.getElementById(address);
	    return new google.maps.places.Autocomplete(this.toAddress, this.autocompleteOptions).getPlace();
	},

	/*
	  Needs to be set to find any location
	*/
	setGeocoder: function(geocode) {
	    this.geocoder = geocode;
	},

	/*
	   Needs to be set to find any location
	*/
	setNavigator: function(navigator) {
	    this.navigator = navigator;
	},

	setMarkerCount: function(count) {
	    this.markerCount = count;
	},

	getMarkerCount: function() {
	    return this.markerCount;
	},

	/*********************************** Basic Functionality ***********************************/

	/* Creates Map */
	create: function(id, options, geocoder, navigator) {
	    this.id = id;
	    this.options = options;
	    this.markerCount = 0;
	    this.geocoder = geocoder;
	    this.navigator = navigator;
	    this.map =  new google.maps.Map(document.getElementById(id), options);
	    return this.map;
	},


	/* Show Map */
	showMap: function() {
	    var tag = document.getElementById(this.id);
	    tag.style.visibility = 'visible';
	},

	/* Hides Map */
	hideMap: function() {
	    var tag = document.getElementById(this.id);
	    tag.style.visibility = 'hidden';
	},

	/*********************************** Locations ***********************************/

	/*
	  Returns the Current Location Asynchronously
	 */
	getCurrentLocation: function() {
	    return new Promise ((resolve,reject) => {
		navigator.geolocation.getCurrentPosition(function(pos) {
		    var location = {
			lat: pos.coords.latitude,
			lng: pos.coords.longitude
		    };
		    resolve(location);
		});
	    });
	},

	/*
	  Returns the Location of the From HTML input tag
	 */
	getFromLocation: function() {
	    return new Promise((resolve,reject) => {
		this.geocoder.geocode({'address':this.fromAddress.value},function(results, status) {
		    if (status === 'OK')
			resolve(results[0].geometry.location);
		    else reject(status);
		});

	    });
	},

	/*
	  Returns the Location of the To HTML input tag
	 */
	getToLocation: function() {
	    return new Promise((resolve,reject) => {
		this.geocoder.geocode({'address':this.toAddress.value}, function(results, status) {
		    if(status === 'OK')
			resolve(results[0].geometry.location);
		    else reject(status);
		});
	    });
	},
	
	// Fits the bounds
	fitBounds: function(markers)
	{
	    var bounds = new google.maps.LatLngBounds();
	    for(index in markers){
		var position = markers[index].getPosition();
		bounds.extend(position);
	    }
	    this.map.setCenter(bounds.getCenter());
	    this.map.fitBounds(bounds);
	    this.map.setZoom(this.map.getZoom()-1);
	    return this.map;
	},
	
	/*
	  Sets the Center of the map
	*/
	setCenter: function(location) {
	    this.map.setCenter(location);
	},
	
    };
    
    return {
	Map: Map
    };
});
