import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreLayoutComponent } from './more-layout.component';

describe('MoreLayoutComponent', () => {
  let component: MoreLayoutComponent;
  let fixture: ComponentFixture<MoreLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
