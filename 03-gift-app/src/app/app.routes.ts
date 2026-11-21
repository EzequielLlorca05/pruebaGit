import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard'; // Importamos el guard que creamos

export const routes: Routes = [
  // 1. Redirigir la raíz '' hacia el login por defecto
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // 2. Ruta pública para el Login
  {
    path: 'login',
    loadComponent: () =>
      import('./Login/Login/Login') // Reemplaza por la ruta de tu componente Login
  },

  // 3. Ruta protegida del Dashboard (solo accesible con sesión iniciada)
  {
    path: 'dashboard',
    loadComponent: () => 
      import('./gifs/pages/dashboard-pages/dashboard-pages'),
    canActivate: [authGuard], // <-- Guard que protege la entrada
    children: [           
      {
        path: 'trending',
        loadComponent: () =>
          import('./gifs/pages/trending-page/trending-page')
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./gifs/pages/search-page/search-page')
      },
      {
        path: 'history/:query',
        loadComponent: () =>
          import('./gifs/pages/gif-history/gif-history')
      },   
      {
        path: 'petForm',
        loadComponent: () =>
          import('./gifs/pages/pet-registration-form-signal/petForm')
      },   
      {
        path: 'portfolioEze',
        loadComponent: () =>
          import('./gifs/pages/portfolio-eze/portfolio-eze')
      },   
      {
        path: '**',
        redirectTo: 'trending',
      },
    ],
  },

  // 4. Cualquier ruta desconocida redirige al login
  {
    path: '**',
    redirectTo: 'login',
  }
];