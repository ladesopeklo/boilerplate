///<reference path='typings\tsd.d.ts'/>
///<reference path='data\data.ImageGallery.ts'/>

declare var Velocity: any;


module FullSize {

	export class controller {
		imageGallery:data.ImageGallery;
		windowWidth:number;
		windowHeight:number;

		constructor(settings:any) {
			settings = settings || {};
            this.windowWidth = settings.windowWidth;
			this.windowHeight = settings.windowHeight;
		}

		public showContent(gallery, imageIndex:number) {
			this.imageGallery = gallery;
			this.imageGallery.init(imageIndex);
		}

		public handleKeyDown(e) {
			if (!this.imageGallery) {
				return;
			}
			if (e.keyCode === 39) {
				this.imageGallery.next();
				m.redraw();
			}
			if (e.keyCode === 37) {
				this.imageGallery.prev();
				m.redraw();
			}
			if (e.keyCode === 27) {
				this.imageGallery = undefined;
				m.redraw();
			}
		}

		heightCorrected() {
			return Math.ceil(this.windowHeight / 100) * 100;
		}

		actionNext(element, isInitialized, context) {
			if (!isInitialized) {
			}
		}

		actionToolbar(element, isInitialized, context) {
			if (!isInitialized) {
//				element.style.opacity = 0;
//				$(element).velocity({opacity: 1});
			}
		}

		prevButtonConfig(element, isInitialized, context) {
			if (!isInitialized) {
//				element.style.opacity = 0;
//                $(element).velocity({opacity: 1});
			}
		}

		imageLoad(element, isInitialized, context) {
			if (!isInitialized) {
				$(element).css("opacity", 0);
				$(element).bind("load", function () {
					$(element).css("opacity", 1);
				});
			}
		}
	}

	export function view(c:FullSize.controller):MithrilVirtualElement {
        if (!c.imageGallery) {
			return;
		}

		return m("div", {'class': "module-fullsize"}, [
			renderCurrentImage(c),
			m("div", {'class': "actions" , config: c.actionToolbar}, [
				m("div", {'class': "container_12"}, [
					m("div", {'class': "grid_1"}, prevButton(c)),
					m("div", {'class': "grid_9"}, c.imageGallery.name),
					m("div", {'class': "grid_1"}, galleryInfoView(c.imageGallery)),
					m("div", {'class': "grid_1"}, nextButton(c))
				]),
			]),
		]);
	}

	function nextButton(c) {
        return m("paper-icon-button", {'icon': "arrow-forward", "title": "arrow-back",
				config: c.actionNext,
				onclick: c.imageGallery.next.bind(c.imageGallery)},
			"next");
	}

	function galleryInfoView(imageGallery:data.ImageGallery):MithrilVirtualElement {
        var info = (imageGallery.getCurrentIndex() + 1) + "/" + imageGallery.imagesCount;
        return m("div", info);
    }

	function prevButton(c) {
        return m("paper-icon-button", {'icon': "arrow-back", "title": "arrow-back",
			config: c.prevButtonConfig.bind(c),
			onclick: c.imageGallery.prev.bind(c.imageGallery)}, "prev");
	}

	function renderCurrentImage(c:FullSize.controller) {
		var image = c.imageGallery.getCurrentImage();
		return  m("div", {
			'class': "image-wrap"
		}, [

			m("img", {
				src: image.square(c.heightCorrected()),
				config: c.imageLoad
			})
		]);
	}
};


