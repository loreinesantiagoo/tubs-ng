import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TubsService } from '../../shared/services/tubs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private tubsSvc: TubsService,
              private route: Router) { }

  results = [];

  ngOnInit() {
    
  }

}
