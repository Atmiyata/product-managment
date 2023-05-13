import { Routes } from '@angular/router';

import {
  ProductsComponent,
  ProductAddComponent,
  ProductDetailComponent,
} from './components/products';

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
    path: 'products/add',
    component: ProductAddComponent,
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
  },
  {
    path: 'trash',
    loadComponent: () =>
      import('./components/trash/trash.component').then(
        (m) => m.TrashComponent
      ),
  },
];
