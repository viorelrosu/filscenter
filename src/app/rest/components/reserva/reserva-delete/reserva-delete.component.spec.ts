import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaDeleteComponent } from './reserva-delete.component';

describe('ReservaDeleteComponent', () => {
  let component: ReservaDeleteComponent;
  let fixture: ComponentFixture<ReservaDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservaDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
