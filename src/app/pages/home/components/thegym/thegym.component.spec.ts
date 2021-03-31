import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThegymComponent } from './thegym.component';

describe('ThegymComponent', () => {
  let component: ThegymComponent;
  let fixture: ComponentFixture<ThegymComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThegymComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThegymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
