import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalidadListComponent } from './localidad-list.component';

describe('LocalidadListComponent', () => {
  let component: LocalidadListComponent;
  let fixture: ComponentFixture<LocalidadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalidadListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalidadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
