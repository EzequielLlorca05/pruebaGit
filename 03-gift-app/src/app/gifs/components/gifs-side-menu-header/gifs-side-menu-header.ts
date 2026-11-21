import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '@environmens/environment';


@Component({
  selector: 'app-gifs-side-menu-header',
  imports: [],
  templateUrl: './gifs-side-menu-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsSideMenuHeader {

envs = environment;

}
