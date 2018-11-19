import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  loggedIn: any;
  subscription: Subscription;

  constructor(public authSvc: AuthService,
    private router: Router) {
    this.subscription = this.authSvc.currentUser
      .subscribe(isLoggedIn => { this.loggedIn = isLoggedIn; });
  }

  ngOnInit() {
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
