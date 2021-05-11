import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioTablasComponent } from './inicio-tablas.component';

describe('InicioTablasComponent', () => {
  let component: InicioTablasComponent;
  let fixture: ComponentFixture<InicioTablasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioTablasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioTablasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
