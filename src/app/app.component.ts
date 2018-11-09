import { Component, OnInit, OnDestroy } from '@angular/core';
import { TubsService } from './shared/services/tubs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tubs';


  constructor( private tubsSvc: TubsService) {}

  ngOnInit() { }

}
