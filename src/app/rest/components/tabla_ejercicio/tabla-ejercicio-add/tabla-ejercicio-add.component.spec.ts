import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaEjercicioAddComponent } from './tabla-ejercicio-add.component';

describe('TablaEjercicioAddComponent', () => {
  let component: TablaEjercicioAddComponent;
  let fixture: ComponentFixture<TablaEjercicioAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaEjercicioAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaEjercicioAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
