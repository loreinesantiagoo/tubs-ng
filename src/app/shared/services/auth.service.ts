import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { catchError, distinctUntilChanged } from 'rxjs/operators';
import { AuthInfo } from '../models/auth-info';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';
import * as firebase from 'firebase/app';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static UNKNOWN_USER = new AuthInfo(null, null);
  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);
  authState: any = null;

  private registerRootApiUrl = `/register`;
  private loginRootApiUrl = `/login`;

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private afAuth: AngularFireAuth,
    private _storageService: LocalStorageService,
    private router: Router) {
    this.afAuth.authState.subscribe((auth) => {
      console.log(auth);
      this.authState = auth;
    });
  }
  loginWithGoogle() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          this.updateUserData();
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        }
        );
    });
  }
  private updateUserData() {
    console.log('call backend end point to update userdata....');
  }


  signUp(registerUser) {
    return this.fromFirebaseAuthPromise(this.afAuth.auth.createUserWithEmailAndPassword(registerUser.email, registerUser.password))
      .pipe(
        catchError(this.handleError('sign up error: something went wrong !'))
      );
  }
  loginWithEmail(loginUser): Observable<AuthInfo> {
    return this.fromFirebaseAuthPromise(this.afAuth.auth.signInWithEmailAndPassword(loginUser.email, loginUser.password))
      .pipe(
        catchError(this.handleError('login with email error', AuthInfo))
      );
  }
  logout() {
    this._storageService.remove('firebaseIdToken');
    this.afAuth.auth.signOut();
    this.authInfo$.next(AuthService.UNKNOWN_USER);
    this.router.navigate(['/login']);
  }


// firebase promise to subject to observable
  fromFirebaseAuthPromise(promise): Observable<any> {
    const subject = new Subject<any>();
    promise
      .then(res => {
        const authInfo = new AuthInfo(
          this.afAuth.auth.currentUser.uid,
          this.afAuth.auth.currentUser.email);
        this.isAuthenticatedSubject.next(true);
        this.authInfo$.next(authInfo);
        subject.next(res);
        subject.complete();

      },
        err => {
          this.authInfo$.error(err);
          console.log('err1' + err);
          subject.error(err);
          subject.complete();
        });
    return subject.asObservable();
  }

  setFirebaseTokenToLocalstorage() {
    this.afAuth.auth.currentUser.getIdToken().then(idToken => {
      console.log('FIREBASE TOKEN !!!! ' + idToken);
      this.saveToken(idToken);
    });
  }

  getIdToken(): String {
    return window.localStorage['firebaseToken'];
  }

  saveToken(token: String) {
    console.log('Firebase token ! > ' + token);
    window.localStorage['firebaseToken'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('firebaseToken');
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(JSON.stringify(error));
      return Observable.throw(error || 'backend server error');
    };
  }
}
