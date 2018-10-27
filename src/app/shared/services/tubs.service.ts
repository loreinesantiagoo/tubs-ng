import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of, throwError, Subject } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Product, EditProduct } from '../product-model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TubsService {
  private ProductRootApiUrl = `${environment.api_url}products`;

  // variable
  products: string[];
  product: EditProduct;

  uploadAPI = environment.uploadUrl;
  currentUploadURL: string;

  productObservable: Observable<Product[]>;

  constructor(private http: HttpClient) { }

  addProduct(p): Observable<any> {
    console.log('posting new product');
    return this.http.post<Product>(this.ProductRootApiUrl, p, httpOptions)
      .pipe(
        catchError(this.handleError('add new product error', this.product))
      );
  }

  public getProducts(): Observable<Product[]> {
    console.log('getting products data from api>>>');
    return this.http
      .get<Product[]>(this.ProductRootApiUrl)
      .pipe(
        retry(3),
        // tap(product => this.log('fetched products')),
        catchError(this.handleError('getAllProducts', []))
      );
  }
  public getProductById(idValue): Observable<any> {
    console.log('>>>>getProductById');
    return this.http
      .get<EditProduct>(`${this.ProductRootApiUrl}/${idValue}`)
      .pipe(
        map(products => products[0]),
        catchError(this.handleError('get product by id error'))
      );
  }

  updateProduct(p): Observable<EditProduct> {
    return this.http
      .put<EditProduct>(this.ProductRootApiUrl, p, httpOptions)
      .pipe(
        catchError(this.handleError<EditProduct>('updating product error'))
      );
  }

  deleteProduct(idValue): Observable<Product> {
    return this.http
      .delete<Product>(`${this.ProductRootApiUrl}?id=${idValue}`)
      .pipe(
        catchError(this.handleError<Product>('deleting product error'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
