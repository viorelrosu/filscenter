import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoEjercicioListComponent } from './tipo-ejercicio-list.component';

describe('TipoEjercicioListComponent', () => {
  let component: TipoEjercicioListComponent;
  let fixture: ComponentFixture<TipoEjercicioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoEjercicioListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoEjercicioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
