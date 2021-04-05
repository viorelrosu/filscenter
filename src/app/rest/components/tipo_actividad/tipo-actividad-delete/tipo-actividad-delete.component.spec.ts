import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoActividadDeleteComponent } from './tipo-actividad-delete.component';

describe('TipoActividadDeleteComponent', () => {
  let component: TipoActividadDeleteComponent;
  let fixture: ComponentFixture<TipoActividadDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoActividadDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoActividadDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
