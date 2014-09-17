/*global gData, google */
(function () {

	/**
	 *
	 * @param element
	 * @param options
	 * @constructor
	 */
	gData.Map = function (element, options) {
		this.options = options;
		this.map = new google.maps.Map(element, options);
		this.markers = [];
	};


	/**
	 *
	 * @param {object=} options
	 */
	gData.Map.prototype.addMarker = function (options) {
		var marker = new google.maps.Marker({
			position: this.options.center,
			//	icon: icons[feature.type].icon,
			map: this.map
		});

		this.markers.push(marker);
	};

}());