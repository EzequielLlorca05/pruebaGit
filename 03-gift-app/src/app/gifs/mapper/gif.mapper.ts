import { Gif } from "../interfaces/gif.interface";
import { Giphyitem } from "../interfaces/giphy.interfaces";


export class GifMapper {

    static mapGiphiItemGif( item: Giphyitem ): Gif {
        return{
            id: item.id,
            title: item.title,
            url: item.images.original.url,
        };
    }

    static maGiphyItemstoGifArray(item: Giphyitem[]): Gif[]{
        return item.map(this.mapGiphiItemGif);
    }
}