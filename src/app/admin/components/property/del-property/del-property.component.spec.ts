import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelPropertyComponent } from './del-property.component';

describe('DelPropertyComponent', () => {
  let component: DelPropertyComponent;
  let fixture: ComponentFixture<DelPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
