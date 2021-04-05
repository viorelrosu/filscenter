import { TestBed } from '@angular/core/testing';

import { TipoEjercicioServiceService } from './tipo-ejercicio-service.service';

describe('TipoEjercicioServiceService', () => {
  let service: TipoEjercicioServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoEjercicioServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
