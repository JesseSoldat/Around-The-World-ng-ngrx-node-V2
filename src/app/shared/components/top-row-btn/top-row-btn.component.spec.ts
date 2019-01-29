import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRowBtnComponent } from './top-row-btn.component';

describe('TopRowBtnComponent', () => {
  let component: TopRowBtnComponent;
  let fixture: ComponentFixture<TopRowBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopRowBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopRowBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
