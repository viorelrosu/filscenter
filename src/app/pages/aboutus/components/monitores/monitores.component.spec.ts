import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoresComponent } from './monitores.component';

describe('MonitoresComponent', () => {
  let component: MonitoresComponent;
  let fixture: ComponentFixture<MonitoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
