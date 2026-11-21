import { Component, inject, signal } from '@angular/core';
import { GifList } from '../../components/gif-list/gif-list';
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';
import { GifMapper } from '../../mapper/gif.mapper';

@Component({
  selector: 'app-search-page',
  imports: [GifList],
  templateUrl: './search-page.html',
})
export default class SearchPage {

  gifsServise = inject(GifService)
  gifs = signal<Gif[]>([])

  onSerch(query: string) {
    this.gifsServise.searchGifs(query).subscribe( (resp) =>
    {
      this.gifs.set(resp)
    })

  }

}
