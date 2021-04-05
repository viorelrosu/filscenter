import { TestBed } from '@angular/core/testing';

import { ActividadServiceService } from './actividad-service.service';

describe('ActividadServiceService', () => {
  let service: ActividadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
