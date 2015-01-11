module gData {
    export class PhotoUrl {
        url:string;
        urlParts:Array<string>;
        placeholder:number;

        constructor(url:string) {
            this.url = url;
            this.urlParts = this.url.split("/");

            this.placeholder = this.urlParts.length - 1;
        }

        get(size?: string) {
            this.urlParts[this.placeholder] = size || "s75-c";
            return this.urlParts.join("/") + "/";
        }
    }
}
