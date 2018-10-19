import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tubs';

  // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;
  // eventList = new Array<string>();
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    // this.eventList.push(`<strong>Free Delivery for neighbourhood</strong>`);
    // this.eventList.push(`<strong>Easy to install</strong>`);
    // this.eventList.push(`<strong>Cost Saving</strong>`);

    // this.firstFormGroup = this._formBuilder.group({
    //   quantity1: ['', Validators.required],
    //   quantity2: ['', Validators.required],
    //   quantity3: ['', Validators.required]
    // });

    // this.secondFormGroup = this._formBuilder.group({
    //   blkNoCtrl: ['', Validators.required],
    //   levelCtrl: ['', Validators.required],
    //   unitNoCtrl: ['', Validators.required]
    // });
  }
}
