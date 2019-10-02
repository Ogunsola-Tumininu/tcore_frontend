import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedAppontmentComponent } from './confirmed-appontment.component';

describe('ConfirmedAppontmentComponent', () => {
  let component: ConfirmedAppontmentComponent;
  let fixture: ComponentFixture<ConfirmedAppontmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmedAppontmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmedAppontmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
