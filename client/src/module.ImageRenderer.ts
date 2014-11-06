///<reference path='data/data.ImageInterface.ts'/>

module ImageRenderer {

	export class controller {
		imageData: data.ImageInterface;

		render(imageData:data.ImageInterface):ImageRenderer.controller {
			this.imageData = imageData;
			return this;
		}
	}

	export function view(ctrl:ImageRenderer.controller) {
		return m("div", {style: "border:1px solid red"}, [
			m("img", {src: ctrl.imageData.square(200)})
		]);
	}
}
