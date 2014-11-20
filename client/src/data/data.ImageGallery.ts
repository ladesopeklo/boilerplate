///<reference path='data.image.ts'/>

module data {
	export class ImageGallery {
		images:Array<data.ImageInterface>;
		name:string;
		activeImageIndex:number;
        imagesCount: number = 0;

        circular: boolean = false;

		constructor(d) {
			var images = d.images || [];
			this.images = [];
			this.name = d.name;
			for (var i = 0; i < images.length; i++) {
				this.images.push(new data.GoogleImage(images[i]));
			}
			this.activeImageIndex = 0;
            this.imagesCount = this.images.length;

		}

		init(index) {
			this.activeImageIndex = index;
		}

        getIndex(offset) {
            var index = this.activeImageIndex + offset;

            if (index === this.images.length) {
                if (!this.circular) {
                    return this.activeImageIndex;
                }
                index = 0;
            }

            if (index < 0) {
                if (!this.circular) {
                    return this.activeImageIndex;
                }
                index = this.images.length - 1;
            }

            return index;

        }

		next() {
			this.activeImageIndex = this.getIndex(1);
		}

		prev() {
			this.activeImageIndex = this.getIndex(-1);

		}

		isOnFirstPosition() {
			return this.activeImageIndex === 0;
		}

        getCurrentIndex():number {
			return this.activeImageIndex;
		}

        getCurrentImage():data.ImageInterface {
            return this.images[this.activeImageIndex];
		}
	}
}