import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../product-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeacrhService {
  baseUrl = `${environment.api_url}`;
  queryUrl = '?search=';

  constructor(private http: HttpClient) { }

  searchProducts(term: string): Observable<Product[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Product[]>(`${environment.api_url}products/?name=${term}`)
    .pipe(
      // tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Product[]>('searchProducts', []))
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
