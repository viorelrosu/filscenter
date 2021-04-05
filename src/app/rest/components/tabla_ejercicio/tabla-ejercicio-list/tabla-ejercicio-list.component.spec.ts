import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaEjercicioListComponent } from './tabla-ejercicio-list.component';

describe('TablaEjercicioListComponent', () => {
  let component: TablaEjercicioListComponent;
  let fixture: ComponentFixture<TablaEjercicioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaEjercicioListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaEjercicioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
