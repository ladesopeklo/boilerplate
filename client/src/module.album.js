var album = {};

album.getData = function () {
	return m.request({method: "GET", url: "/data/repo.json"});
};


album.controller = function () {
	var name = m.route.param("name");
	var self = this;

	album.getData().then(function (x) {
		self.model = new data.Repository(x);
		self.gallery = new gallery.controller(new data.ImageGallery(self.model.gallery()));
	});
};

album.view = function (ctrl) {
	return [
		m("div", "albym")
	];
};
