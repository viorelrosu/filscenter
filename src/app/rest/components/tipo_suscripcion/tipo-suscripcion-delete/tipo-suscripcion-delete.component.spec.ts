import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoSuscripcionDeleteComponent } from './tipo-suscripcion-delete.component';

describe('TipoSuscripcionDeleteComponent', () => {
  let component: TipoSuscripcionDeleteComponent;
  let fixture: ComponentFixture<TipoSuscripcionDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoSuscripcionDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoSuscripcionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
