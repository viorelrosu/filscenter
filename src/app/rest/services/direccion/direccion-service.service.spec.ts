import { TestBed } from '@angular/core/testing';

import { DireccionServiceService } from './direccion-service.service';

describe('DireccionServiceService', () => {
  let service: DireccionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DireccionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
