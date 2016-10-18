angular.module('app').factory('controlService', function() {

    var Control = function() {

    }

    Control.prototype = {

	createExample: function(controlDiv,map) {

	    var chicago = {lat: 41.85, lng: -87.65};

	    // Set CSS for the control border
	    var controlUI = document.createElement('div');
	    controlUI.style.backgroundColor = '#fff';
	    controlUI.style.border = '2px solid #fff';
	    controlUI.style.cursor = 'pointer';
	    controlUI.style.marginBottom = '22px';
	    controlUI.style.textAlign = 'center';
	    controlUI.title = 'Click to recenter the map';
	    controlDiv.appendChild(controlUI);

	    // Set CSS for the control interior
	    var controlText = document.createElement('div');
	    controlText.style.color = 'rgb(25,25,25)';
	    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
	    controlText.style.fontSize = '16px';
	    controlText.style.lineHeight = '38px';
	    controlText.style.paddingLeft = '5px';
	    controlText.style.paddingRight = '5px';
	    controlText.innerHTML = 'Center Map';
	    controlUI.appendChild(controlText);

	    // Setup the click event listeners: simply set the map to Chicago.
	    controlUI.addEventListener('click', function() {
		map.setCenter(chicago);
	    });
	},
	
    };
    
    return {
	Control:Control
    };

});
