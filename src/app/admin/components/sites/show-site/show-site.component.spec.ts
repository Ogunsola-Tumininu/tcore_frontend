import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSiteComponent } from './show-site.component';

describe('ShowSiteComponent', () => {
  let component: ShowSiteComponent;
  let fixture: ComponentFixture<ShowSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
