/*global gData, data*/
(function () {
	"use strict";
	data.Image = function (data) {
		this.url = new gData.PhotoUrl(data.u);
	};

	data.Image.prototype.getUrl = function (size) {
		return this.url.get(size || "s130-c");
	};

	data.Image.prototype.toJson = function () {
	};
}());
