import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaDeleteComponent } from './factura-delete.component';

describe('FacturaDeleteComponent', () => {
  let component: FacturaDeleteComponent;
  let fixture: ComponentFixture<FacturaDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
