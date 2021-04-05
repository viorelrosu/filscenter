import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalidadDeleteComponent } from './localidad-delete.component';

describe('LocalidadDeleteComponent', () => {
  let component: LocalidadDeleteComponent;
  let fixture: ComponentFixture<LocalidadDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalidadDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalidadDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
