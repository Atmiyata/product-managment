import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

import { Product } from '../models/product';

interface TrashParam {
  search?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TrashService {
  private domain: string = 'http://localhost:4500';

  constructor(private http: HttpClient) {}

  getTrashProducts(param?: TrashParam): Observable<Product[]> {
    const { search } = param || {};

    if (search)
      return this.http.get<Product[]>(
        `${this.domain}/trash?name_like=${search}`
      );

    return this.http.get<Product[]>(`${this.domain}/trash`);
  }

  addTrashProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.domain}/trash`, product);
  }

  restoreProduct(product: Product) {
    return this.http
      .delete(`${this.domain}/products/${product.id}`)
      .pipe(
        switchMap(() =>
          this.http.post<Product>(`${this.domain}/product`, product)
        )
      );
  }

  deleteTrashProduct(productId: string) {
    return this.http.delete(`${this.domain}/trash/${productId}`);
  }
}
