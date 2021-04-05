import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaquillaAddComponent } from './taquilla-add.component';

describe('TaquillaAddComponent', () => {
  let component: TaquillaAddComponent;
  let fixture: ComponentFixture<TaquillaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaquillaAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaquillaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
