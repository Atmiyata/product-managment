import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../models/product';

interface ProductParam {
  search?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private localStorageKey: string = 'trash';
  private domain: string = 'http://localhost:4500';

  constructor(private http: HttpClient) {}

  getProducts(param?: ProductParam): Observable<Product[]> {
    const { search } = param || {};

    if (search)
      return this.http.get<Product[]>(
        `${this.domain}/products?name_like=${search}`
      );

    return this.http.get<Product[]>(`${this.domain}/products`);
  }

  getTrashProducts() {
    const productIds = localStorage.getItem(this.localStorageKey);
    return JSON.parse(productIds || '[]');
  }

  softDelete(id: string): void {
    const productIds = localStorage.getItem(this.localStorageKey);
    let trashIds: string[] = this.getTrashProducts();
    if (trashIds.includes(id)) return;

    trashIds.push(id);

    localStorage.setItem(this.localStorageKey, JSON.stringify(trashIds));
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.domain}/products`, product);
  }
}
