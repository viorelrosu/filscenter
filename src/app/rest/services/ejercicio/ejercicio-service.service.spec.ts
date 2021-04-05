import { TestBed } from '@angular/core/testing';

import { EjercicioServiceService } from './ejercicio-service.service';

describe('EjercicioServiceService', () => {
  let service: EjercicioServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EjercicioServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
