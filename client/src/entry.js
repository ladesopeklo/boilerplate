/*global m*/
"use strict";

var entry = {};

entry.Album = function (data) {
	this.title = data.title.$t;
	this.id = data.gphoto$id.$t;
	this.link = data.link[1].href;
};

entry.controller = function (data) {
	this.model = new entry.Album(data);
};

entry.view = function (controller) {
	return m("div", [
		m("a", {
			href:"/album/" + controller.model.id,
			config: m.route
		}, controller.model.title),
		m("div", controller.model.link)
	]);
};
