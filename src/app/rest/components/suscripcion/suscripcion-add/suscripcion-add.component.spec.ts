import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscripcionAddComponent } from './suscripcion-add.component';

describe('SuscripcionAddComponent', () => {
  let component: SuscripcionAddComponent;
  let fixture: ComponentFixture<SuscripcionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuscripcionAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuscripcionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
