import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoActividadUpdateComponent } from './tipo-actividad-update.component';

describe('TipoActividadUpdateComponent', () => {
  let component: TipoActividadUpdateComponent;
  let fixture: ComponentFixture<TipoActividadUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoActividadUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoActividadUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
