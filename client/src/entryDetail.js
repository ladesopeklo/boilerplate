/*global m*/
"use strict";

var entryDetail = {};

entryDetail.AlbumDetail = function () {

};

entryDetail.AlbumDetail.prototype.init = function (data) {
	console.log(data);

};

entryDetail.getData = function () {
	var id = m.route.param("id");
	return m.request({method: "GET", url: "https://picasaweb.google.com/data/feed/api/user/108104263107535951418/albumid/" + id + "?alt=json"});
};

entryDetail.controller = function () {
	var self = this;

	this.model = new entryDetail.AlbumDetail();
	entryDetail.getData().then(function (data) {
		self.model.init(data);
	});

};

entryDetail.view = function (controller) {
	return m("div", [
		m("div", "xxx"),
		m("div", controller.model.title),
		m("div", controller.model.link)
	]);
};
