import { TestBed } from '@angular/core/testing';

import { TaquillaServiceService } from './taquilla-service.service';

describe('TaquillaServiceService', () => {
  let service: TaquillaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaquillaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
