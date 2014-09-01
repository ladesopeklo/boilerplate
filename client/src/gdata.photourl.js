/*global gData*/
(function () {
	"use strict";

	gData.PhotoUrl = function (url) {
		this.url = url;
		this.urlParts = this.url.split("/");

		this.placeholder = this.urlParts.length - 1;
		this.urlParts.splice(this.placeholder, 0, "s75");
	};

	gData.PhotoUrl.prototype.get = function (size) {
		this.urlParts[this.placeholder] = size || "s75-c";
		return this.urlParts.join("/");
	};
}());
