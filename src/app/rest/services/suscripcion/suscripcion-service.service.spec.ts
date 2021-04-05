import { TestBed } from '@angular/core/testing';

import { SuscripcionServiceService } from './suscripcion-service.service';

describe('SuscripcionServiceService', () => {
  let service: SuscripcionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuscripcionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
