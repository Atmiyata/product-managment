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
  private domain: string = 'http://localhost:4500/products';

  constructor(private http: HttpClient) {}

  getProducts(param?: ProductParam): Observable<Product[]> {
    const { search } = param || {};
    if (search)
      return this.http.get<Product[]>(`${this.domain}?name_like=${search}`);

    return this.http.get<Product[]>(this.domain);
  }
}
