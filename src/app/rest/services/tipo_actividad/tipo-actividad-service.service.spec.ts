import { TestBed } from '@angular/core/testing';

import { TipoActividadServiceService } from './tipo-actividad-service.service';

describe('TipoActividadServiceService', () => {
  let service: TipoActividadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoActividadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
