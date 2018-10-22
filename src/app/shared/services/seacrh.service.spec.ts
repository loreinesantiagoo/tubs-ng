import { TestBed, inject } from '@angular/core/testing';

import { SeacrhService } from './seacrh.service';

describe('SeacrhService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeacrhService]
    });
  });

  it('should be created', inject([SeacrhService], (service: SeacrhService) => {
    expect(service).toBeTruthy();
  }));
});
