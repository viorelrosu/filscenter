import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadDeleteComponent } from './actividad-delete.component';

describe('ActividadDeleteComponent', () => {
  let component: ActividadDeleteComponent;
  let fixture: ComponentFixture<ActividadDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActividadDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
