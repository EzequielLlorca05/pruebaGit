import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, Query, signal } from '@angular/core';
import { environment } from '@environmens/environment';
import  type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

const loadFromLocalstorage = () => {
    const gifsFromLocalStorage = localStorage.getItem('gifs') ?? '{}';
    const gifs = JSON.parse(gifsFromLocalStorage);

return gifs;
};

// {
//     'goku': [gif1,gif2,gif3],
//     'Saitama': [gif1,gif2,gif3],
//     'dragon ball': [gif1,gif2,gif3],
// }

// Record<string, Gif[]>

@Injectable({providedIn: 'root'})
export class GifService {

    private http = inject(HttpClient);

    trendingGif = signal<Gif[]>([]);
    rendingGifsLoading = signal(true);

    searchHistory = signal<Record<string, Gif[]>>(loadFromLocalstorage());
    searchHistoryKey = computed(() => Object.keys(this.searchHistory()));

constructor() {
    this.loadTrendingGifs();
}

saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem('gifs', historyString);
})

    loadTrendingGifs() {
        this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: 20,
            },
        }).subscribe( (resp) => {
            const gifs = GifMapper.maGiphyItemstoGifArray(resp.data);
            this.trendingGif.set(gifs);
            this.rendingGifsLoading.set(false);
        });
    }

    searchGifs(search: string){
        return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`,{
            params: {
                api_key:environment.giphyApiKey,
                limit: 20,
                q: search,
            }
        }).pipe(
            map( ({ data }) => data ),
            map( ( items ) => GifMapper.maGiphyItemstoGifArray(items)),

            //Historial
            tap( (items) => {
                this.searchHistory.update( (history) => ({
                    ...history,
                    [search.toLowerCase()] : items,
                }));           
            })
        );
        //.subscribe( (resp) =>{
        //     const gifsSearch = GifMapper.maGiphyItemstoGifArray(resp.data)
        //     // this.trendingGif.set(gifsSearch)
        //     // this.rendingGifsLoading.set(false)
        //     console.log({ gifsSearch })
        // });
    }

    getHistoryGif(query: string):Gif[]{
        return this.searchHistory()[query] ?? [];
    }
    
}