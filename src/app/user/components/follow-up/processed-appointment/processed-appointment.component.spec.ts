import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessedAppointmentComponent } from './processed-appointment.component';

describe('ProcessedAppointmentComponent', () => {
  let component: ProcessedAppointmentComponent;
  let fixture: ComponentFixture<ProcessedAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessedAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessedAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
