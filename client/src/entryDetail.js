/*global m*/
"use strict";

var entryDetail = {};

entryDetail.AlbumDetail = function () {

};


(function () {

	gData.Photo = function (data) {
		this.width = Number(data.gphoto$width.$t, 10);
		this.height = Number(data.gphoto$height.$t, 10);
		this.id = data.gphoto$id.$t;
		this.url = new gData.PhotoUrl(data.media$group.media$content[0].url);
		this.thumb = data.media$group.media$thumbnail[0].url;
	};
	gData.Photo.prototype.toJson = function () {
		return {u: this.url.get()};
	};

}());

(function () {
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

(function () {
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


entryDetail.getData = function () {
	var id = m.route.param("id"),
        userId = globalSettings.userId;

	return m.request({method: "GET", url: "https://picasaweb.google.com/data/feed/api/user/" + userId + "/albumid/" + id + "?alt=json"});
};

entryDetail.controller = function () {
	var self = this;
	this.flag = m.prop(true);
	this.album = new gData.PhotoAlbum();


	entryDetail.getData().then(function (data) {
		self.album.init(data);

		console.log(self.album);
		console.log(JSON.stringify(self.album.toJson()));
	});

};

entryDetail.resolveView = function (flag) {
	if (flag) {
		return m("div", "fglag " + flag);
	}
	return m("div", "flag " + flag);
};


entryDetail.view = function (controller) {
	return m("div", [
		m("div", controller.album.title),
		m("input", {
			type: "checkbox",
			checked: controller.flag(),
			onchange: m.withAttr("checked", controller.flag)
		}),
		m("div", entryDetail.resolveView(controller.flag())),
		controller.album.photos.map(function (photo) {
			return m("div", {style: "float:lexft"}, [
				m("a", {href: photo.url.get() }, [
					m("img", {src: photo.url.get()}),
				]),
				m("span", JSON.stringify(photo.toJson()))
			]);
		}),
//		m("div", JSON.stringify(controller.album.toJson()))
	]);
};
