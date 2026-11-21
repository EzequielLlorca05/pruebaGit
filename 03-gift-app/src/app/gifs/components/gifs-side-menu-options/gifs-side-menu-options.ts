import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { GifService } from '../../services/gifs.service';

interface menuOptions{
  icon: string;
  label: string;
  route: string;
  subLabel: string;
}

@Component({
  selector: 'app-gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './gifs-side-menu-options.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsSideMenuOptions {

  gifSearch = inject(GifService);

  menuOptions: menuOptions[] = [
      {
      icon:'fa-solid fa-chart-line',
      label: 'Rending',
      subLabel: 'Gif Populares',
      route: '/dashboard/trending'
      },
      
      {
      icon:'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      subLabel: 'Buscar Gif',
      route: '/dashboard/search',
      } , 

      {
      icon:'fa-solid fa-dog',
      label: 'petForm',
      subLabel: 'Apunta a tu mascota',
      route: '/dashboard/petForm',
      } , 

            {
      icon:'fa-solid fa-dog',
      label: 'portfolioEze',
      subLabel: 'Curiculum Eze',
      route: '/dashboard/portfolioEze',
      } , 
  ];

}
