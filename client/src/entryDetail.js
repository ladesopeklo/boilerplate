/*global m*/
"use strict";

var entryDetail = {};

entryDetail.AlbumDetail = function () {

};

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
	});

};

entryDetail.resolveView = function (flag) {
	if (flag) {
		return m("div", "fglag " + flag);
	}
	return m("div", "flag " + flag);
};
entryDetail.resolveThumb = function (photo, flag) {
   if (flag) {
       return m("a", {href: photo.url.get() }, [
           m("img", {src: photo.url.get()}),
       ]);
   }
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
                entryDetail.resolveThumb(photo, controller.flag()),
                m("span", JSON.stringify(photo.toJson()) + ",")
			]);
		})
	]);
};
