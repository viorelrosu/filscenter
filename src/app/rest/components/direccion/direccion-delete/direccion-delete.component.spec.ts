import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DireccionDeleteComponent } from './direccion-delete.component';

describe('DireccionDeleteComponent', () => {
  let component: DireccionDeleteComponent;
  let fixture: ComponentFixture<DireccionDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DireccionDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DireccionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
