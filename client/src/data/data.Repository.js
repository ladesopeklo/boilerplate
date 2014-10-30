///<reference path='../../libs/bower_components/gdata/gdata.photourl.ts'/>
var data;
(function (_data) {
    var Repository = (function () {
        function Repository(data) {
            this.galleriesAll = function () {
                return this.galleries;
            };
            this.galleries = data.data.galleries;
        }
        Repository.prototype.gallery = function (index) {
            var i = index || 0;
            return this.galleries[i];
        };
        return Repository;
    })();
    _data.Repository = Repository;
})(data || (data = {}));
