import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GifsSideMenu } from '../../components/gifs-side-menu/gifs-side-menu';

@Component({
  selector: 'app-dashboard-pages',
  imports: [RouterOutlet, GifsSideMenu],
  templateUrl: './dashboard-pages.html',

})
export default class DashboardPages {}
