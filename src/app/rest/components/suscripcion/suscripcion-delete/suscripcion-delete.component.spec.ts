import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscripcionDeleteComponent } from './suscripcion-delete.component';

describe('SuscripcionDeleteComponent', () => {
  let component: SuscripcionDeleteComponent;
  let fixture: ComponentFixture<SuscripcionDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuscripcionDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuscripcionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
