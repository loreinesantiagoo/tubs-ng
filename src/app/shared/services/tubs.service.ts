import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ProductsConfig } from '../../shared/model';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  }
  )
};

@Injectable({
  providedIn: 'root'
})
export class TubsService {

  configUrl = 'assets/config.json';

  constructor(private http: HttpClient) { }

  getAllProducts() {
    console.log('service received!');
    return this.http.get<ProductsConfig>(this.configUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getConfigResponse(): Observable<HttpResponse<ProductsConfig>> {
    return this.http.get<ProductsConfig>(
      this.configUrl, { observe: 'response' });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
