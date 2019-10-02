import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocatePresenterComponent } from './allocate-presenter.component';

describe('AllocatePresenterComponent', () => {
  let component: AllocatePresenterComponent;
  let fixture: ComponentFixture<AllocatePresenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocatePresenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocatePresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
