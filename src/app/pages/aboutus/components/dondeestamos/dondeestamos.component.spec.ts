import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DondeestamosComponent } from './dondeestamos.component';

describe('DondeestamosComponent', () => {
  let component: DondeestamosComponent;
  let fixture: ComponentFixture<DondeestamosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DondeestamosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DondeestamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
