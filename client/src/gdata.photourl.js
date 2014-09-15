
(function () {
    gData.PhotoUrl = function (url, width, height) {
        this.url = url;
        this.urlParts = this.url.split("/");
        this.width = width;
        this.height= height;

        this.placeholderIndex = this.urlParts.length - 1;
        this.urlParts.splice(this.placeholderIndex, 0, "s75");
    };

    /**
     * @param {string|number=} size
     * -1: fullsize,
     * empty - default thumb,
     * w99 - set width to 99
     * @returns {string} url
     */
    gData.PhotoUrl.prototype.get = function (size) {
        var setSize = size || "s75";

        if (size === -1) {
            setSize =  "w" + this.width;
        }
        this.urlParts[this.placeholderIndex] = setSize;
        return this.urlParts.join("/");
    };
}());