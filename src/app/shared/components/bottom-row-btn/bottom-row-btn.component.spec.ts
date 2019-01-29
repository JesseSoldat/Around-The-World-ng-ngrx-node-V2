import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomRowBtnComponent } from './bottom-row-btn.component';

describe('BottomRowBtnComponent', () => {
  let component: BottomRowBtnComponent;
  let fixture: ComponentFixture<BottomRowBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomRowBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomRowBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
