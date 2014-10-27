/*global m*/
var fullsize = {};

fullsize.controller = function () {

};
/**
 *
 * @param {data.ImageGallery} gallery
 * @param {number} imageIndex
 */
fullsize.controller.prototype.showContent = function (gallery, imageIndex) {
	this.imageGallery = gallery;
	this.imageGallery.init(imageIndex);
};

fullsize.view = function (c) {
	if (c.imageGallery === undefined) {
		return;
	}

	function renderImageContainer(imageUrl) {
		return m("div", {style: "width:100px;height:100px;border:1px solid red"}, [
			m("img", {src : imageUrl})
		]);
	}

	return m("div", {class: "module-fullsize"}, [
		m("div", c.imageGallery.name),
		m("div", [
			m("div", {onclick: c.imageGallery.next.bind(c.imageGallery)}, "next" ),
			m("div", {onclick: c.imageGallery.prev.bind(c.imageGallery)}, "prev" ),
		] ),
		renderImageContainer(c.imageGallery.getImage("s100-c")),
	]);
};
