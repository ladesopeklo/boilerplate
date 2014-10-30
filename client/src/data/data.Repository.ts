///<reference path='../../libs/bower_components/gdata/gdata.photourl.ts'/>

module data {
	export class Repository {
		galleries: any;

		constructor(data) {
			this.galleries = data.data.galleries;
		}

		gallery(index:number) {
			var i = index || 0;
			return this.galleries[i];
		}

		galleriesAll = function () {
			return this.galleries;
		}
	}
}

