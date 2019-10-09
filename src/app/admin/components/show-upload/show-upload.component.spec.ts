import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUploadComponent } from './show-upload.component';

describe('ShowUploadComponent', () => {
  let component: ShowUploadComponent;
  let fixture: ComponentFixture<ShowUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
