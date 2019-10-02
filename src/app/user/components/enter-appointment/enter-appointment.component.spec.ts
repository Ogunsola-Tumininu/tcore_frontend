import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterAppointmentComponent } from './enter-appointment.component';

describe('EnterAppointmentComponent', () => {
  let component: EnterAppointmentComponent;
  let fixture: ComponentFixture<EnterAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
