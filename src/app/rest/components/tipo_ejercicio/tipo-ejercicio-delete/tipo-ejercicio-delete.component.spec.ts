import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoEjercicioDeleteComponent } from './tipo-ejercicio-delete.component';

describe('TipoEjercicioDeleteComponent', () => {
  let component: TipoEjercicioDeleteComponent;
  let fixture: ComponentFixture<TipoEjercicioDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoEjercicioDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoEjercicioDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
