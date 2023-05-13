import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, switchMap, Observable, debounceTime } from 'rxjs';
import {
  Params,
  Router,
  ActivatedRoute,
  NavigationExtras,
} from '@angular/router';
import {
  OnInit,
  OnDestroy,
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';

import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { ProductCardComponent } from './product-card';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, FormsModule, InputTextModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit, OnDestroy {
  private destroyed$: Subject<void> = new Subject<void>();

  products$: Observable<Product[]>;

  searchVal: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {
    this.products$ = this.activatedRoute.queryParams.pipe(
      debounceTime(300),
      switchMap((param: Params) =>
        this.productService.getProducts(
          param ? { search: param['name'] } : undefined
        )
      )
    );
  }

  onSearch() {
    let routeParams: NavigationExtras = {
      relativeTo: this.activatedRoute,
    };

    if (this.searchVal) {
      routeParams = {
        ...routeParams,
        queryParams: { name: this.searchVal.trim() },
        queryParamsHandling: 'merge',
      };
    }

    this.router.navigate([], routeParams);
  }

  ngOnInit(): void {
    const param: Params = this.activatedRoute.snapshot.queryParams;
    this.searchVal = param['name'];
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  trackByProduct(_: number, product: Product) {
    return product.id;
  }
}
