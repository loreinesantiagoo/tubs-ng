
import {throwError as observableThrowError,  Observable, Subject, BehaviorSubject, ReplaySubject, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AuthInfo } from '../models/auth-info';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { User, Roles } from '../models/user';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static UNKNOWN_USER = new AuthInfo(null, null);
  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);
  authState: any = null;

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  user$: Observable<User>;
  roles: Roles;

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private _storageService: LocalStorageService,
    private router: Router) {
    //// Get auth data, then get firestore user document || null
    this.afAuth.authState.pipe(
      switchMap(authData => {
        if (authData) {
          // signed in
          return this.afs.doc<User>(`users/${authData.uid}`).valueChanges();
        } else {
          // not signed in
          return of(null);
        }
      }))
      .subscribe((_authInfo$) => {
        console.log(this.authInfo$);
        this.authInfo$.next(_authInfo$);
      });
  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return this.oAuthLogin(provider);
  }


  oAuthLogin(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
      }, err => {
        // console.log(err);
      });
  }


  //// Update user data ////

  /// updates database with user info after login
  /// only runs if user role is not already defined in database
  private updateUserData(authData) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${authData.uid}`);

    const data: User = {
      uid: authData.uid,
      email: authData.email,
      displayName: authData.displayName,
      // photoURL: user.photoURL,
      roles: { reader: true, admin: true, editor: true }
    };

    return userRef.set(data, { merge: true });
  }
  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
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
    this.afAuth.auth.signOut().then(result => this.destroyToken());
    this.authInfo$.next(AuthService.UNKNOWN_USER);
    this.router.navigate(['/login']);
  }
  ///// Abilities and Roles Auth //////
  ////// Assign Roles to an ability method //////
  canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber'];
    return this.checkAuth(user, allowed);
  }
  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor'];
    return this.checkAuth(user, allowed);
  }
  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuth(user, allowed);
  }

  // determines if user has matching role
  private checkAuth(user: User, allowedRoles: string[]): boolean {
    if (user) {
      for (const role of allowedRoles) {
        if (user.roles[role]) {
          return true;
        } else {
          return false;
        }
      }
    }
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
      // console.log('FIREBASE TOKEN !!!! ' + idToken);
      this.saveToken(idToken);
    });
  }

  getIdToken(): String {
    return window.localStorage['firebaseToken'];
  }

  saveToken(token: String) {
    // console.log('Firebase token ! > ' + token);
    window.localStorage['firebaseToken'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('firebaseToken');
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(JSON.stringify(error));
      return observableThrowError(error || 'backend server error');
    };
  }
}
