import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoSuscripcionListComponent } from './tipo-suscripcion-list.component';

describe('TipoSuscripcionListComponent', () => {
  let component: TipoSuscripcionListComponent;
  let fixture: ComponentFixture<TipoSuscripcionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoSuscripcionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoSuscripcionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
