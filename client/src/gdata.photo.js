/*global gData*/
(function () {
	"use strict";

	gData.Photo = function (data) {
		this.width = Number(data.gphoto$width.$t, 10);
		this.height = Number(data.gphoto$height.$t, 10);
		this.id = data.gphoto$id.$t;
		this.url = new gData.PhotoUrl(data.media$group.media$content[0].url, this.width, this.height);
		this.thumb = data.media$group.media$thumbnail[0].url;
	};
	gData.Photo.prototype.toJson = function () {
		return {u: this.url.get()};
	};
}());

