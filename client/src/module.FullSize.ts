///<reference path='..\libs\bower_components\mithril\mithril.d.ts'/>
///<reference path='data/data.ImageGallery.ts'/>

module FullSize {

	export class controller {
		imageGallery:data.ImageGallery;
		windowWidth: number;
		windowHeight: number;

		constructor(settings: any) {
			this.windowWidth = settings.windowWidth;
			this.windowHeight = settings.windowHeight;
		}

		public showContent(gallery, imageIndex:number) {
			this.imageGallery = gallery;
			this.imageGallery.init(imageIndex);
		}

		heightCorrected() {
			return Math.ceil(this.windowHeight / 100) * 100;
		}
	}

	export function view(c: FullSize.controller) : MithrilVirtualElement {
		if (c.imageGallery === undefined) {
			return;
		}

		return m("div", {'class': "module-fullsize"}, [
			m("div", c.imageGallery.name),
			m("div", [
				m("div", {onclick: c.imageGallery.next.bind(c.imageGallery)}, "next"),
				m("div", {onclick: c.imageGallery.prev.bind(c.imageGallery)}, "prev")
			]),
			renderCurrentImage(c)
		]);
	}

	function renderCurrentImage(c: FullSize.controller) {
		var image = c.imageGallery.getCurrentImage();
		return  m("div", {class: "image-wrap", style: "border:1px solid red"}, [
			m("img", {src: image.square(c.heightCorrected())})
		]);
	}
}



