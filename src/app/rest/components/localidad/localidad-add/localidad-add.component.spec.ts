import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalidadAddComponent } from './localidad-add.component';

describe('LocalidadAddComponent', () => {
  let component: LocalidadAddComponent;
  let fixture: ComponentFixture<LocalidadAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalidadAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalidadAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
