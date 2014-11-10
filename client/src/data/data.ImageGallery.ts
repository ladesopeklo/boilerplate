///<reference path='data.image.ts'/>

module data {
	export class ImageGallery {
		images:Array<data.ImageInterface>;
		name:string;
		activeImageIndex:number;
        circular: boolean = false;

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
                if (!this.circular) {
                    this.activeImageIndex--;
                    return ;
                }

				this.activeImageIndex = 0;
			}
		}
		prev() {
			this.activeImageIndex--;

			if (this.activeImageIndex < 0) {
                if (!this.circular) {
                    this.activeImageIndex++;
                    return ;
                }

				this.activeImageIndex = this.images.length - 1;
			}
		}

		isOnFirstPosition() {
			return this.activeImageIndex === 0;
		}
        getCurrentImage():data.ImageInterface {
            return this.images[this.activeImageIndex];
		}
	}
}