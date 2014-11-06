///<reference path='data.image.ts'/>

module data {
	export class ImageGallery {
		images:Array<data.ImageInterface>;
		name:string;
		activeImageIndex:number;

		constructor(d) {
			var images = d.images || [];
			this.images = [];
			this.name = d.name;
			for (var i = 0; i < images.length; i++) {
				this.images.push(new data.GoogleImage(images[i]));
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

        getCurrentImage():data.ImageInterface {
            return this.images[this.activeImageIndex];
		}

		toJson() {
		}
	}
}