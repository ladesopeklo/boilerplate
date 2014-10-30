///<reference path='..\libs\bower_components\mithril\mithril.d.ts'/>
///<reference path='data/data.ImageGallery.ts'/>

module FullSize {

	export class controller {
		imageGallery:data.ImageGallery;

		public showContent(gallery, imageIndex:number) {
			this.imageGallery = gallery;
			this.imageGallery.init(imageIndex);
		}

		public renderImageContainer(imageUrl:string) {
			return m("div", {style: "width:100px;height:100px;border:1px solid red"}, [
				m("img", {src: imageUrl})
			]);
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
			c.renderImageContainer(c.imageGallery.getImage("s100-c"))
		]);
	}
}



