import { TestBed, inject } from '@angular/core/testing';

import { TubsService } from './tubs.service';

describe('TubsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TubsService]
    });
  });

  it('should be created', inject([TubsService], (service: TubsService) => {
    expect(service).toBeTruthy();
  }));
});
