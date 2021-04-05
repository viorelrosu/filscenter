import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoEjercicioAddComponent } from './tipo-ejercicio-add.component';

describe('TipoEjercicioAddComponent', () => {
  let component: TipoEjercicioAddComponent;
  let fixture: ComponentFixture<TipoEjercicioAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoEjercicioAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoEjercicioAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
