import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesSuscripcionComponent } from './planes-suscripcion.component';

describe('PlanesSuscripcionComponent', () => {
  let component: PlanesSuscripcionComponent;
  let fixture: ComponentFixture<PlanesSuscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanesSuscripcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanesSuscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
