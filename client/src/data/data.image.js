///<reference path='../../libs/bower_components/gdata/gdata.photourl.ts'/>
var data;
(function (_data) {
    var Image = (function () {
        function Image(data) {
            this.url = new gData.PhotoUrl(data.u, null);
        }
        Image.prototype.getUrl = function (size) {
            return this.url.get(size || "s130-c");
        };
        Image.prototype.toJson = function () {
        };
        return Image;
    })();
    _data.Image = Image;
})(data || (data = {}));
