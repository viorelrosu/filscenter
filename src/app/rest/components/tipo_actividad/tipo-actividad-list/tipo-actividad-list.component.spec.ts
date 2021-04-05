import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoActividadListComponent } from './tipo-actividad-list.component';

describe('TipoActividadListComponent', () => {
  let component: TipoActividadListComponent;
  let fixture: ComponentFixture<TipoActividadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoActividadListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoActividadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
