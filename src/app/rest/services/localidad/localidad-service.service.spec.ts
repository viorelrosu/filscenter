import { TestBed } from '@angular/core/testing';

import { LocalidadServiceService } from './localidad-service.service';

describe('LocalidadServiceService', () => {
  let service: LocalidadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalidadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
