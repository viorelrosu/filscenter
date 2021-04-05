import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjercicioAddComponent } from './ejercicio-add.component';

describe('EjercicioAddComponent', () => {
  let component: EjercicioAddComponent;
  let fixture: ComponentFixture<EjercicioAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjercicioAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EjercicioAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
