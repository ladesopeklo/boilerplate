/*global m, entry, data*/
"use strict";

var index = {};

index.getData = function () {
	return m.request({method: "GET", url: "/data/repo.json"});
};

index.controller = function () {
	var self = this;
	this.db = null;

	index.getData().then(function (x) {
		self.db = new data.Repository(x);
		self.galleries = [];
		self.fullSize =  new fullsize.controller();

		var albums = self.db.galleriesAll();

		for (var i = 0; i < albums.length; i++) {
			self.galleries.push(new gallery.controller(new data.ImageGallery(albums[i]), {moduleFullsize: self.fullSize }));
		}

	});
};

index.view = function (ctrl) {
	return [
		ctrl.galleries.map(function (item) {
			return m("div", gallery.view(item));
		})
	];
};


var fullsize = {};
fullsize.controller = function () {
	this.content = null;
};
/**
 *
 * @param {data.ImageGallery} gallery
 */
fullsize.controller.prototype.showContent = function (gallery) {
	this.content = gallery;
};

fullsize.view = function (c) {
	if (c.content === null) {
		return;
	}
	return m("div", [
		m("div", "xxx"),
		m("div", c.content.name)
	]);
};

