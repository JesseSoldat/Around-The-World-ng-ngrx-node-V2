import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDetailModalComponent } from './image-detail-modal.component';

describe('ImageDetailModalComponent', () => {
  let component: ImageDetailModalComponent;
  let fixture: ComponentFixture<ImageDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
