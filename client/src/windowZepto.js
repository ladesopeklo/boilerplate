///<reference path='def/zepto.d.ts'/>
var WindowZepto = (function () {
    function WindowZepto() {
        WindowZepto.instance = this;
    }
    WindowZepto.getInstance = function () {
        if (WindowZepto.instance === null) {
            WindowZepto.instance = new WindowZepto();
            WindowZepto.instance.init();
        }
        return WindowZepto.instance;
    };
    WindowZepto.prototype.init = function () {
        var win = $(window), self = this;
        win.bind("resize", function () {
            self.width = win.width();
            self.height = win.height();
        });
        this.width = win.width();
        this.height = win.height();
        console.log(this.width, this.height);
    };
    WindowZepto.instance = null;
    return WindowZepto;
})();
//# sourceMappingURL=windowZepto.js.map