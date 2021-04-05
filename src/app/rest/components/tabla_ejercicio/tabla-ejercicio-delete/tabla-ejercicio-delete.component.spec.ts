import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaEjercicioDeleteComponent } from './tabla-ejercicio-delete.component';

describe('TablaEjercicioDeleteComponent', () => {
  let component: TablaEjercicioDeleteComponent;
  let fixture: ComponentFixture<TablaEjercicioDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaEjercicioDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaEjercicioDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
