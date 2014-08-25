/*global m, entry*/
"use strict";

var user = {};

/**
 * @constructor
 */
user.UserInfo = function () {

};

user.UserInfo.prototype.init = function (data) {
	this.data = data;
	this.userId = this.data.feed.gphoto$user.$t;
	this.entry = this.data.feed.entry;
};

user.getData = function () {
	return m.request({method: "GET", url: "https://picasaweb.google.com/data/feed/api/user/108104263107535951418/?alt=json"});
};

user.controller = function () {
	var self = this;
	this.model = new user.UserInfo({});

	user.getData().then(function (data) {
		self.model.init(data);
		console.log(self.model.userId, data);
	});
};
user.view = function (ctrl) {
	return [
		m("a", ctrl.model.userId),
		ctrl.model.entry.map(function (data) {
			return m("div", [
				m("div", entry.view(new entry.controller(data))),
				m("div", "---")
			]);
		})
	];
};