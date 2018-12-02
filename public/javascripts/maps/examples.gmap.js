
(function( $ ) {

	'use strict';

	var initBasicWithMarkers = function() {
		var map = new GMaps({
			div: '#gmap-basic-marker',
			lat: -12.043333,
			lng: -77.028333,
			markers: [{
				lat: -12.043333,
				lng: -77.028333,
				infoWindow: {
					content: '<p>Basic</p>'
				}
			}]
		});

		map.addMarker({
			lat: -12.043333,
			lng: -77.028333,
			infoWindow: {
				content: '<p>Example</p>'
			}
		});
	};

	// auto initialize
	$(function() {
   initBasicWithMarkers();


	});

}).apply(this, [ jQuery ]);
