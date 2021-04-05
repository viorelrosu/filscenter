import { TestBed } from '@angular/core/testing';

import { TipoSuscripcionServiceService } from './tipo-suscripcion-service.service';

describe('TipoSuscripcionServiceService', () => {
  let service: TipoSuscripcionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoSuscripcionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
