import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SeacrhService } from '../../shared/services/seacrh.service';

@Component({
  selector: 'app-search-pipe',
  templateUrl: './search-pipe.component.html',
  styleUrls: ['./search-pipe.component.css']
})
export class SearchPipeComponent implements OnInit {
  results: Object;
  searchTerm$ = new Subject<string>();

  constructor(private searchSvc: SeacrhService) {
    // this.searchSvc.search(this.searchTerm$)
    // .subscribe(results => {
    //   this.results = results;
    // });
   }

  ngOnInit() {
  }

}
