import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPipeComponent } from './search-pipe.component';

describe('SearchPipeComponent', () => {
  let component: SearchPipeComponent;
  let fixture: ComponentFixture<SearchPipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
