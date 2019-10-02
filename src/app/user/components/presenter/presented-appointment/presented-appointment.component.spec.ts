import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentedAppointmentComponent } from './presented-appointment.component';

describe('PresentedAppointmentComponent', () => {
  let component: PresentedAppointmentComponent;
  let fixture: ComponentFixture<PresentedAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentedAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentedAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
