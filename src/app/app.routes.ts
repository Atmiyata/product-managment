import { Routes } from '@angular/router';

import { ProductsComponent } from './components/products';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'trash',
    loadComponent: () =>
      import('./components/trash/trash.component').then(
        (m) => m.TrashComponent
      ),
  },
];
