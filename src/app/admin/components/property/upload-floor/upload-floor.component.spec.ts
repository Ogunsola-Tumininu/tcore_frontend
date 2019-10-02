import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFloorComponent } from './upload-floor.component';

describe('UploadFloorComponent', () => {
  let component: UploadFloorComponent;
  let fixture: ComponentFixture<UploadFloorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadFloorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
