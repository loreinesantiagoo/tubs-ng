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

  uploadAPI = environment.uploadUrl;
  currentUploadURL: string;


  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    console.log('getting products data from api>>>');
    return this.http
    .get(`${environment.api_url}`)
    .pipe(
      retry(3),
      catchError(this.handleError('getAllProducts', []))
      );
  }

  saveProduct(p): Observable<any> {
    console.log('posting new product');
    return this.http.post<Product>( `${environment.api_url}${this.uploadAPI}`, p)
    .pipe(
      catchError(this.handleError('add new product', this.product))
    );
  }

  getProductByName(key: string): Observable<any> {
    const params = new HttpParams().set('', );
    return this.http
      .get(`${environment.api_url}/name`, { params: params});
  }

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
