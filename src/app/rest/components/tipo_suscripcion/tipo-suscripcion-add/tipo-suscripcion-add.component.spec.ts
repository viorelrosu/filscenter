import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoSuscripcionAddComponent } from './tipo-suscripcion-add.component';

describe('TipoSuscripcionAddComponent', () => {
  let component: TipoSuscripcionAddComponent;
  let fixture: ComponentFixture<TipoSuscripcionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoSuscripcionAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoSuscripcionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
