import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenterReportComponent } from './presenter-report.component';

describe('PresenterReportComponent', () => {
  let component: PresenterReportComponent;
  let fixture: ComponentFixture<PresenterReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresenterReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
