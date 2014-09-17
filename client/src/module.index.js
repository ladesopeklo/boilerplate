/*global m, entry*/
"use strict";

var index = {};

index.getData = function () {
	return m.request({method: "GET", url: "/data/repo.json"});
};

index.controller = function () {
	var self = this;
	this.model = null;

	index.getData().then(function (x) {
		self.model = new data.Repository(x);
		self.gallery = new gallery.controller(new data.ImageGallery(self.model.gallery()));
	});
};

index.view = function (ctrl) {
	return [
		m("div", gallery.view(ctrl.gallery))
	];
};



var gallery = {};

/**
 *
 * @param {data.ImageGallery} imageGallery
 * @param {object=} settings
 */
gallery.controller = function (imageGallery, settings) {
	this.settings = settings || {};
	this.name = imageGallery.name;

	this.images = imageGallery.images;
	this.fullSize = new fullsize.controller();
};
gallery.controller.prototype.open = function (value) {
	this.fullSize.showContent(value);
};


gallery.view = function (controller) {
	return m("div",
		[
			controller.images.map(function (item) {
				return m("img", {src: item.url, onclick: controller.open.bind(controller, item.url)});
			}),
			m("div", fullsize.view(controller.fullSize))
		]);
};

var fullsize = {};
fullsize.controller = function () {
	this.content = null;
};
fullsize.controller.prototype.showContent = function (gallery) {
	this.content = gallery;
};

fullsize.view = function (c) {
	if (c.content === null) {
		return;
	}
	return m("div", [m("div", "xxx"), m("div", c.content)]);
};

