/*global m, entry*/
"use strict";

var index = {};

index.getData = function () {
	return m.request({method: "GET", url: "https://picasaweb.google.com/data/feed/api/user/108104263107535951418/?alt=json"});
};

index.controller = function () {
	var self = this;
	this.model = null;


	index.getData().then(function (x) {
		self.model = new data.Repository(x);
		self.aaa = "asdjbsajd";
	});
};
index.view = function (ctrl) {
	return [
		m("a", ctrl.aaa)
	];
};