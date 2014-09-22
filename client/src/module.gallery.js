/*global fullsize, m*/
var gallery = {};
/**
 *
 * @param {data.ImageGallery} imageGallery
 * @param {object=} settings
 */
gallery.controller = function (imageGallery, settings) {
	this.settings = settings || {};
	this.name = imageGallery.name;
	this.images = imageGallery.images;

	this.imageGallery = imageGallery;

	this.fullSize = settings.moduleFullsize;
};
/**
 *
 * @param {data.ImageGallery} imageGallery
 */
gallery.controller.prototype.open = function (imageGallery) {
	this.fullSize.showContent(imageGallery);
};


gallery.view = function (controller) {
	return m("div",
		[
			m("div", controller.name),

			controller.images.map(function (item) {
				return m("img", {src: item.getUrl(), onclick: controller.open.bind(controller, controller.imageGallery)});
			}),
			m("div", fullsize.view(controller.fullSize))
		]);
};