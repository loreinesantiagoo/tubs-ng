import { Injectable } from '@angular/core';

import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { LocalStorageService } from 'ngx-localstorage';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    IdToken: string;

    constructor(private afAuth: AngularFireAuth, private _storageService: LocalStorageService) {
    }
    headersConfig = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.afAuth.auth.currentUser.getIdToken().then(idToken => {
            console.log(idToken);
            console.log('>>>>>>>>getIdToken');
            this.IdToken = idToken;
            this._storageService.set('firebaseIdToken', idToken);
            const headers = new HttpHeaders();
            const authRequest = request.clone(
                {
                    headers: headers,
                    withCredentials: true
                });
            console.log('REQUEST !' + JSON.stringify(authRequest));
            return next.handle(authRequest);
        }
        );
        return next.handle(request);
    }
}
