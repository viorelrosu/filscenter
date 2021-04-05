import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscripcionListComponent } from './suscripcion-list.component';

describe('SuscripcionListComponent', () => {
  let component: SuscripcionListComponent;
  let fixture: ComponentFixture<SuscripcionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuscripcionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuscripcionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
