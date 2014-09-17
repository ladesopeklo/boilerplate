/*global gData*/
(function () {
	"use strict";

	gData.PhotoAlbum = function () {
		this.photos = [];
		this.title = "";
	};

	gData.PhotoAlbum.prototype.init = function (data) {
		var i,
			photos = data.feed.entry;

		this.title = data.feed.title.$t;
		for (i = 0; i < photos.length; i++) {
			this.photos.push(new gData.Photo(photos[i]));
		}
	};

	gData.PhotoAlbum.prototype.toJson = function () {
		var json = [],
			i;

		for (i = 0; i < this.photos.length; i++) {
			json.push(this.photos[i].toJson());
		}
		return json;
	};

}());
