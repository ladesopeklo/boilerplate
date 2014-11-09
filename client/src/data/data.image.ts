///<reference path='data.ImageInterface.ts'/>
module data {
	export class GoogleImage implements ImageInterface{
		url:gData.PhotoUrl;

		constructor(data) {
			this.url = new gData.PhotoUrl(data.u, null, null);
		}

		getUrl(size):string {
			return this.url.get(size || "s130-c");
		}

        square(size:number) {
            return this.url.get("s" + size + "-c");
        }

		toJson() {

		}
	}
}


module gData {
    export class PhotoUrl{
        url: string;
        width: number;
        height: number;
        urlParts: Array<string>;
        placeholderIndex: number;

        constructor(url, width, height) {
            this.width = width || 1920;
            this.height = height || -1;
            this.url = url;

            this.urlParts = this.url.split("/");
            this.placeholderIndex = this.urlParts.length - 2;
        }

        get(size) {
            var setSize = size || "s75";

            if (size === -1) {
                setSize =  "w" + this.width;
            }
            this.urlParts[this.placeholderIndex] = setSize;
            return this.urlParts.join("/");

        }
    }
}

