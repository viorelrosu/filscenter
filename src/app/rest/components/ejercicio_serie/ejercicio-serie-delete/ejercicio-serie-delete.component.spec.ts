import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjercicioSerieDeleteComponent } from './ejercicio-serie-delete.component';

describe('EjercicioSerieDeleteComponent', () => {
  let component: EjercicioSerieDeleteComponent;
  let fixture: ComponentFixture<EjercicioSerieDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjercicioSerieDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EjercicioSerieDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
