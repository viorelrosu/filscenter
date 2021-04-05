import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjercicioSerieListComponent } from './ejercicio-serie-list.component';

describe('EjercicioSerieListComponent', () => {
  let component: EjercicioSerieListComponent;
  let fixture: ComponentFixture<EjercicioSerieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjercicioSerieListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EjercicioSerieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
