import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolAddComponent } from './rol-add.component';

describe('RolAddComponent', () => {
  let component: RolAddComponent;
  let fixture: ComponentFixture<RolAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
