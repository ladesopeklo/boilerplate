///<reference path='..\libs\bower_components\mithril\mithril.d.ts'/>
///<reference path='data/data.ImageGallery.ts'/>
///<reference path='data/data.Repository.ts'/>

module Gallery {
	export class controller {
		settings;
		name:string;
		images:Array<data.ImageInterface>;
		imageGallery:data.ImageGallery;

		constructor(imageGallery:data.ImageGallery, settings) {
			this.settings = settings || {};
			this.name = imageGallery.name;
			this.images = imageGallery.images;

			this.imageGallery = imageGallery;
		}

		click(gallery:data.ImageGallery, image:data.ImageInterface) {
			this.settings.onClick(gallery, image);
		}

		renderImage(image:data.ImageInterface, index:number) {
			return  m("span", {style: "border:1px solid red"}, [
				m("img", {src: image.square(200), onclick: this.click.bind(this, this.imageGallery, index)})
			]);
		}
	}


	export function view(controller):MithrilVirtualElement {
		return m("div",
			[
				m("div", controller.name),
				controller.images.map(function (item, i) {
					return controller.renderImage(item, i);
//					return m("img", {src: item.getUrl(), onclick: controller.click.bind(controller, controller.imageGallery, i)});
				})
			]);
	}
}



