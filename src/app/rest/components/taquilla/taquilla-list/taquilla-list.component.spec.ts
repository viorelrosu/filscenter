import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaquillaListComponent } from './taquilla-list.component';

describe('TaquillaListComponent', () => {
  let component: TaquillaListComponent;
  let fixture: ComponentFixture<TaquillaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaquillaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaquillaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
