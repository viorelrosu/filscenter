import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllServiciosComponent } from './all-servicios.component';

describe('AllServiciosComponent', () => {
  let component: AllServiciosComponent;
  let fixture: ComponentFixture<AllServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllServiciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
