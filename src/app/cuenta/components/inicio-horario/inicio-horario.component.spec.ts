import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaInicioHorarioComponent } from './inicio-horario.component';

describe('CuentaInicioHorarioComponent', () => {
  let component: CuentaInicioHorarioComponent;
  let fixture: ComponentFixture<CuentaInicioHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentaInicioHorarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaInicioHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
