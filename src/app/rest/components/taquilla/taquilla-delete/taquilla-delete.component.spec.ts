import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaquillaDeleteComponent } from './taquilla-delete.component';

describe('TaquillaDeleteComponent', () => {
  let component: TaquillaDeleteComponent;
  let fixture: ComponentFixture<TaquillaDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaquillaDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaquillaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
