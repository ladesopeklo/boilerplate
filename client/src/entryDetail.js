/*global m*/
"use strict";

var entryDetail = {};

entryDetail.AlbumDetail = function () {

};

var gData = {};



entryDetail.getData = function () {
	var id = m.route.param("id");
	return m.request({method: "GET", url: "https://picasaweb.google.com/data/feed/api/user/108104263107535951418/albumid/" + id + "?alt=json"});
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
