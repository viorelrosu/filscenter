import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinciaDeleteComponent } from './provincia-delete.component';

describe('ProvinciaDeleteComponent', () => {
  let component: ProvinciaDeleteComponent;
  let fixture: ComponentFixture<ProvinciaDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvinciaDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinciaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
