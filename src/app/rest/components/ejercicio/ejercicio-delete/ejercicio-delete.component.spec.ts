import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjercicioDeleteComponent } from './ejercicio-delete.component';

describe('EjercicioDeleteComponent', () => {
  let component: EjercicioDeleteComponent;
  let fixture: ComponentFixture<EjercicioDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjercicioDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EjercicioDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
