import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, filter, map } from 'rxjs';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getListOfProduct(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/products').pipe(
      map((res: any) => {
        res.sort((a: Product, b: Product) => a.name.localeCompare(b.name));
        return res;
      }),
      delay(500)
    );
  }

  createNewProduct(
    name: string,
    category: string,
    quantity: number,
    price: number
  ): Observable<any> {
    return this.httpClient.post('http://localhost:3000/products', {
      name: name,
      category: category,
      quantity: quantity,
      price: price,
    });
  }
  editProduct(
    id: string,
    name: string,
    category: string,
    quantity: number,
    price: number
  ): Observable<any> {
    return this.httpClient.put(`http://localhost:3000/products/${id}`, {
      name: name,
      category: category,
      quantity: quantity,
      price: price,
    });
  }
  deleteProduct(id: string): Observable<any> {
    return this.httpClient.delete(`http://localhost:3000/products/${id}`, {});
  }
}
