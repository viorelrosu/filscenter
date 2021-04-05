import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoActividadAddComponent } from './tipo-actividad-add.component';

describe('TipoActividadAddComponent', () => {
  let component: TipoActividadAddComponent;
  let fixture: ComponentFixture<TipoActividadAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoActividadAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoActividadAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
