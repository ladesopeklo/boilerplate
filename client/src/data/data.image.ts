///<reference path='../../libs/bower_components/gdata/gdata.photourl.ts'/>
module data {
	export class Image {
		url:gData.PhotoUrl;

		constructor(data) {
			this.url = new gData.PhotoUrl(data.u, null);
		}

		getUrl(size):string {
			return this.url.get(size || "s130-c");
		}

		toJson() {

		}
	}
}

