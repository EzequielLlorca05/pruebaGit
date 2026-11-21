import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifService } from '../../services/gifs.service';
import { GifList } from "../../components/gif-list/gif-list";
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gif-history',
  imports: [GifList],
  templateUrl: './gif-history.html',
})
export default class GifHistory {


  gifsServise = inject(GifService)

    query = toSignal(
    inject(ActivatedRoute).params.pipe(
    map( (params) => params['query'] ))
  );

  gifsByKey = computed(() => {
    return this.gifsServise.getHistoryGif(this.query());
  })

  }
