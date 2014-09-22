/*global gData, data*/
(function () {
	"use strict";
	data.Image = function (data) {
		this.url = new gData.PhotoUrl(data.u);
	};

	data.Image.prototype.getUrl = function () {
		return this.url.get("s130-c");
	};

	data.Image.prototype.toJson = function () {
	};
}());
