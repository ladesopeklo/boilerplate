///<reference path='..\libs\bower_components\mithril\mithril.d.ts'/>
///<reference path='data/data.ImageGallery.ts'/>
///<reference path='data/data.Repository.ts'/>
///<reference path='def/zepto.d.ts'/>
///<reference path='module.FullSize.ts'/>
///<reference path='windowZepto.ts'/>

module Gallery {
	export class controller {
        fullSize:FullSize.controller;

		name:string;
		images:Array<data.ImageInterface>;
		imageGallery:data.ImageGallery;

		constructor(imageGallery:data.ImageGallery) {
			this.name = imageGallery.name;
			this.images = imageGallery.images;

			this.imageGallery = imageGallery;
            this.fullSize = this.prepareFullScreen();
        }

        prepareFullScreen() {
            var x = WindowZepto.getInstance(),
                fullSize = new FullSize.controller({
                    windowWidth: x.width,
                    windowHeight: x.height
                });

            $(document).bind("keydown", function (e) {
                fullSize.handleKeyDown(e);
            });
            return fullSize;
        }

		click(index) {
		    this.fullSize.showContent(this.imageGallery, index);
        }


        renderImage(image:data.ImageInterface, index:number) {
			return  m("span", {style: "border:1px solid red"}, [
				m("img", {src: image.square(200), onclick: this.click.bind(this, index)})
			]);
		}
	}

	export function view(controller):MithrilVirtualElement {
		return m("div",
			[
				m("div", controller.name),
				controller.images.map(function (item, i) {
					return controller.renderImage(item, i);
				}),
                m("div", FullSize.view(controller.fullSize)),
            ]);
	}
}



