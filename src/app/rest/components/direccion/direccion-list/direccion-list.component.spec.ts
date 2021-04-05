import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DireccionListComponent } from './direccion-list.component';

describe('DireccionListComponent', () => {
  let component: DireccionListComponent;
  let fixture: ComponentFixture<DireccionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DireccionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DireccionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
