import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../auth.service';
import { map, tap, take } from 'rxjs/operators';
import { AuthInfo } from '../../models/auth-info';

@Injectable({
  providedIn: 'root'
})
export class CanReadGuard implements CanActivate {

  constructor(private authSvc: AuthService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authSvc.user$
      .pipe(
        take(1),
        map(user => user && this.authSvc.canRead(user) ? true : false),
        tap(canView => {
          if (!canView) {
            console.error('Access denied - Must have permission to view content');
          }
        })
      );
  }
}
