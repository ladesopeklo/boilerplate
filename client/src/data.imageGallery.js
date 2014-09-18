(function () {
	"use strict";
	data.ImageGallery = function (d) {
		var images = d.images || [];
		this.images = [];
		for (var i = 0; i < images.length; i++) {
			this.images.push(new data.Image(images[i]));
		}
	};
	data.ImageGallery.prototype.toJson = function () {
	};
}());


