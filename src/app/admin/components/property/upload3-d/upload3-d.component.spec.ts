import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Upload3DComponent } from './upload3-d.component';

describe('Upload3DComponent', () => {
  let component: Upload3DComponent;
  let fixture: ComponentFixture<Upload3DComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Upload3DComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Upload3DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
