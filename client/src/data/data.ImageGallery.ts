///<reference path='data.image.ts'/>

module data {
	export class ImageGallery {
		images:Array<any>;
		name:string;
		activeImageIndex:number;

		constructor(d) {
			var images = d.images || [];
			this.images = [];
			this.name = d.name;
			for (var i = 0; i < images.length; i++) {
				this.images.push(new data.Image(images[i]));
			}
			this.activeImageIndex = 0;
		}

		init(index) {
			this.activeImageIndex = index;
		}

		next() {
			this.activeImageIndex++;
			if (this.activeImageIndex === this.images.length) {
				this.activeImageIndex = 0;
			}
		}

		prev() {
			this.activeImageIndex--;
			if (this.activeImageIndex < 0) {
				this.activeImageIndex = this.images.length - 1;
			}
		}

		getImage(resolution:string) {
			return this.images[this.activeImageIndex].getUrl(resolution);
		}

		toJson() {
		}
	}
}