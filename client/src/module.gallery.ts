///<reference path='..\libs\bower_components\mithril\mithril.d.ts'/>
///<reference path='data/data.ImageGallery.ts'/>
///<reference path='data/data.Repository.ts'/>

module Gallery {
	export class controller {
		settings;
		name:string;
		images:Array<data.Image>;
		imageGallery:data.ImageGallery;

		constructor(imageGallery:data.ImageGallery, settings) {
			this.settings = settings || {};
			this.name = imageGallery.name;
			this.images = imageGallery.images;

			this.imageGallery = imageGallery;
		}

		click(gallery:data.ImageGallery, image:data.Image) {
			this.settings.onClick(gallery, image);
		}
	}

	export function view(controller): MithrilVirtualElement {
		return m("div",
			[
				m("div", controller.name),
				controller.images.map(function (item, i) {
					return m("img", {src: item.getUrl(), onclick: controller.click.bind(controller, controller.imageGallery, i)});
				})
			]);
	}
}



