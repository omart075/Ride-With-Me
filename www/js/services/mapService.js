angular.module('app').factory('mapService', function(){
    
     var Map = function(id) {

	/*********************************** Map Properties ***********************************/
	// map Element by id
	this.id = id;
	
	// default mapOptions
	 this.mapOptions = {
	     center: new google.maps.LatLng(37.3000, -120.4833),
	     zoom: 17,
	     mapTypeId: google.maps.MapTypeId.ROADMAP
	 };  
 
	// autocomplete Options (leave blank)
	this.autocompleteOptions = {};

	// grabs the input tags by id
	this.fromAddress = "";
	this.toAddress = "";

	// has to be set before getting any location!
	this.geocoder = "";
	
	this.navigator = "";
    }

    Map.prototype = {

	constructor:Map,

	/*********************************** Setters ***********************************/
	/*
	  This is the same as id in html
	  - Never likely going to be changed -
	 */
	setId:  function(id) {
	    this.id = id;
	},
	
	/*
	  Can be changed from default values
	*/
	setMapOptions: function(options) {
	    this.MapOptions = options;
	},

	/*
	  Setter for Auto Complete Options
	   - Should be an empty Object - 
	 */
	setAutoCompleteOptions: function(options) {
	    this.autocompleteOptions = options;

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
	

	/*********************************** Basic Functionality ***********************************/
	
	/* Creates Map */
	create: function() {
	    return new google.maps.Map(document.getElementById(this.id), this.mapOptions);
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
	asyncGetCurrentLocation: function() {
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

	syncGetCurrentLocation: function() {
	    var location;
	    navigator.geolocation.getCurrentPosition(function(pos) {
		location = {
		    lat: pos.coords.latitude,
		    lng: pos.coords.longitude
		};
	    });
	    return new google.maps.LatLng(location.lat, location.lng);
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
	
    };

    return {
	Map: Map
    };
});
