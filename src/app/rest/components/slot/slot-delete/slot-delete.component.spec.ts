import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotDeleteComponent } from './slot-delete.component';

describe('SlotDeleteComponent', () => {
  let component: SlotDeleteComponent;
  let fixture: ComponentFixture<SlotDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
