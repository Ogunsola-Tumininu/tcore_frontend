import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelProjectComponent } from './del-project.component';

describe('DelProjectComponent', () => {
  let component: DelProjectComponent;
  let fixture: ComponentFixture<DelProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
