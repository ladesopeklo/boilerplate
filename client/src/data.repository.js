(function () {
	"use strict";

	data.Repository = function (data) {
		this.galleries = data.data.galleries;
	};

	data.Repository.prototype.gallery = function (index) {
		var i = index || 0;
		return this.galleries[i];
	};

}());