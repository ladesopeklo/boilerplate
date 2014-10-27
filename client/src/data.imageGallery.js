/*global data*/
(function () {
	"use strict";
	data.ImageGallery = function (d) {
		var images = d.images || [];
		this.images = [];
		this.name = d.name;
		for (var i = 0; i < images.length; i++) {
			this.images.push(new data.Image(images[i]));
		}
		this.activeImageIndex = 0;

	};
	/**
	 * @param {number} index
	 */
	data.ImageGallery.prototype.init = function (index) {
		this.activeImageIndex = index;
	};

	data.ImageGallery.prototype.next = function () {
		this.activeImageIndex++;
		if (this.activeImageIndex === this.images.length) {
			this.activeImageIndex = 0;
		}
	};

	data.ImageGallery.prototype.prev = function () {
		this.activeImageIndex--;
		if (this.activeImageIndex < 0) {
			this.activeImageIndex = this.images.length - 1;
		}
	};

	/**
	 * @param {string} resolution
	 */
	data.ImageGallery.prototype.getImage = function (resolution) {
		return this.images[this.activeImageIndex].getUrl(resolution);
	};

	data.ImageGallery.prototype.toJson = function () {
	};


}());


