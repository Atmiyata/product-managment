import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

import { ProductCardComponent } from './product-card';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  products$: Observable<Product[]>;

  constructor(private service: ProductService) {
    this.products$ = service.getProducts();
  }

  trackByProduct(index: number, product: Product) {
    return product.id;
  }
}
