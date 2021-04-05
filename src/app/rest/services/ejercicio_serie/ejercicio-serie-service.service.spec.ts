import { TestBed } from '@angular/core/testing';

import { EjercicioSerieServiceService } from './ejercicio-serie-service.service';

describe('EjercicioSerieServiceService', () => {
  let service: EjercicioSerieServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EjercicioSerieServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
