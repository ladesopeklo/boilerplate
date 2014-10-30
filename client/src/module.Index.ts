///<reference path='..\libs\bower_components\mithril\mithril.d.ts'/>
///<reference path='module.FullSize.ts'/>
///<reference path='data/data.Repository.ts'/>
///<reference path='data/data.ImageGallery.ts'/>
///<reference path='module.Gallery.ts'/>

module Index {
	export class controller {
		fullSize:FullSize.controller;
		db:data.Repository;
		galleries: Array<Gallery.controller>;

		constructor() {
			this.db = null;
			this.galleries = [];
			this.fullSize = new FullSize.controller();
			this.init();
		}
		private init() {
			var self = this;

			this.getData().then(function (x) {
				self.db = new data.Repository(x);
				var albums = self.db.galleriesAll();

				for (var i = 0; i < albums.length; i++) {
					self.galleries.push(new Gallery.controller(
							new data.ImageGallery(albums[i]),
							{
								onClick: function (gallery, index) {
									self.fullSize.showContent(gallery, index);
								}
							}
						)
					);
				}

			});
		}

		private getData():MithrilPromise {
			return m.request({method: "GET", url: "/data/repo.json"});
		}
	}

	export function view(ctrl:Index.controller) {
		return [
			ctrl.galleries.map(function (item) {
				return m("div", Gallery.view(item));
			}),
			m("div", FullSize.view(ctrl.fullSize)),
		];
	}
}




