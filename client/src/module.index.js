/*global m, entry, data, fullsize, gallery*/
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
		self.fullSize = new fullsize.controller();

		var albums = self.db.galleriesAll();

		for (var i = 0; i < albums.length; i++) {
			self.galleries.push(new gallery.controller(
					new data.ImageGallery(albums[i]),
					{
						onClick: function (gallery, index) {
							self.fullSize.showContent(gallery, index);
						}
					}
				)
			);
		}

	});
};

index.view = function (ctrl) {
	return [
		ctrl.galleries.map(function (item) {
			return m("div", gallery.view(item));
		}),
		m("div", fullsize.view(ctrl.fullSize)),
	];
};



