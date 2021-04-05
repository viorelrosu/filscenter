import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjercicioSerieAddComponent } from './ejercicio-serie-add.component';

describe('EjercicioSerieAddComponent', () => {
  let component: EjercicioSerieAddComponent;
  let fixture: ComponentFixture<EjercicioSerieAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjercicioSerieAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EjercicioSerieAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
