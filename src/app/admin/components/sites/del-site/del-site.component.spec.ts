import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelSiteComponent } from './del-site.component';

describe('DelSiteComponent', () => {
  let component: DelSiteComponent;
  let fixture: ComponentFixture<DelSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
