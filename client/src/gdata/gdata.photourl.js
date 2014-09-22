/*global gData*/
(function () {
	/**
	 *
	 * @param url
	 * @param {number=} width
	 * @constructor
	 */
	gData.PhotoUrl = function (url, width) {
		this.url = url;
		this.urlParts = this.url.split("/");
		this.width = width || null;

		this.placeholderIndex = this.urlParts.length - 2;
		this.default = "s140-c";
	};

	gData.PhotoUrl.init = function (url, width) {
		var withoutDefinedSize = new gData.PhotoUrl(url, width);
		withoutDefinedSize.placeholderIndex = this.urlParts.length - 1;
		withoutDefinedSize.urlParts.splice(withoutDefinedSize.placeholderIndex, 0, this.default);
		return withoutDefinedSize;
	};

	/**
	 * @param {string|number=} size
	 * -1: fullsize,
	 * empty - default thumb,
	 * w99 - set width to 99
	 * @returns {string} url
	 */
	gData.PhotoUrl.prototype.get = function (size) {
		var setSize = size || this.default;

		if (size === -1) {
			setSize =  "w" + this.width;
		}
		this.urlParts[this.placeholderIndex] = setSize;
		return this.urlParts.join("/");
	};
}());