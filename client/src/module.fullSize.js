/*global m*/
var fullsize = {};
fullsize.controller = function (xxx) {
	this.content = xxx;
	this.data = "xxx";
};
/**
 *
 * @param {data.ImageGallery} gallery
 * @param {number} image
 */
fullsize.controller.prototype.showContent = function (gallery, image) {
	this.imageIndex = image;
	this.content = gallery;
};

fullsize.view = function (c) {
	if (c.content === undefined) {
		return;
	}
	return m("div", {class: "module-fullsize"}, [
		m("div", "xxx"),
		m("img", {src: c.content.images[c.imageIndex].getUrl("s900")}),
		m("div", c.content.name)
	]);
};
