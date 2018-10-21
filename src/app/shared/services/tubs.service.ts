import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Product } from '../model';



@Injectable({
  providedIn: 'root'
})
export class TubsService {

  // variable
  products: string[];
  product = '';


  searchCriteria = {
    'offset': 0,
    'limit': 10,
    'keyword': ''
  };
  db: any;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    console.log('getting products data from api>>>');
    return this.http
    .get(`${environment.api_url}${this.product}`)
    .pipe(
      catchError(this.handleError('getAllProducts', []))
      );
  }

  // createProduct(data: Product) {
  //   this.http.createProduct().push(data);
  // }

  // getProductById(key: string) {
  //   this.http.getProductById().object('products/' + key);
  //   return this.product;
  // }

  // updateProduct(data: Product) {
  //   this.http.updateProduct().update(data.$key, data);
  // }

  // deleteProduct(key: string) {
  //   this.http.deleteProduct().remove(key);
  // }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
