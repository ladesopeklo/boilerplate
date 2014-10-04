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
};
/**
 *
 * @param {data.ImageGallery} imageGallery
 */
gallery.controller.prototype.click = function (imageGallery, image) {
	this.settings.onClick(imageGallery, image);
};


gallery.view = function (controller) {
	return m("div",
		[
			m("div", controller.name),

			controller.images.map(function (item, i) {
				return m("img", {src: item.getUrl(), onclick: controller.click.bind(controller, controller.imageGallery, i)});
			}),
		]);
};