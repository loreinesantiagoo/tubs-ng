import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(public authSvc: AuthService,
    private router: Router) { }

  ngOnInit() {
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
