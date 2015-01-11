///<reference path='gData.PhotoUrl.ts'/>


module gData{

    export class Photo {
        width: number;
        height: number;
        id: string;
        url: gData.PhotoUrl;
        thumb: string;

        constructor(data: any) {
            this.width = data.gphoto$width.$t;
            this.height = data.gphoto$height.$t;
            this.id = data.gphoto$id.$t;
            this.url = new gData.PhotoUrl(data.media$group.media$content[0].url);
            this.thumb = data.media$group.media$thumbnail[0].url;
        }

        toJson():any {
            return {u: this.url.get()};
        }
    }
}
