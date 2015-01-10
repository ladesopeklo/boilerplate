///<reference path='..\libs\typings\tsd.d.ts'/>

class WindowZepto {
	static instance: WindowZepto = null;

	width: number;
	height: number;

	constructor() {
		 WindowZepto.instance = this;
	}
	public static getInstance() {
		if (WindowZepto.instance === null) {
			WindowZepto.instance = new WindowZepto();
			WindowZepto.instance.init();
		}
		return WindowZepto.instance;
	}

	init() {
		var win = $(window),
			self = this;

		win.bind("resize", function () {
			self.width = win.width();
			self.height = win.height();
		});

		this.width = win.width();
		this.height = win.height();
		console.log(this.width, this.height);
	}
}