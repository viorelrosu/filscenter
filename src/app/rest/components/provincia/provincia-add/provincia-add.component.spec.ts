import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinciaAddComponent } from './provincia-add.component';

describe('ProvinciaAddComponent', () => {
  let component: ProvinciaAddComponent;
  let fixture: ComponentFixture<ProvinciaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvinciaAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinciaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
