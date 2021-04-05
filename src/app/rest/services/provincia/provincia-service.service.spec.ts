import { TestBed } from '@angular/core/testing';

import { ProvinciaServiceService } from './provincia-service.service';

describe('ProvinciaServiceService', () => {
  let service: ProvinciaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvinciaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
