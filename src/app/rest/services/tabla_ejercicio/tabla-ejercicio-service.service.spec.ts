import { TestBed } from '@angular/core/testing';

import { TablaEjercicioServiceService } from './tabla-ejercicio-service.service';

describe('TablaEjercicioServiceService', () => {
  let service: TablaEjercicioServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablaEjercicioServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
