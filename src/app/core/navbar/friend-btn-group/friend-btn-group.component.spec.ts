import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendBtnGroupComponent } from './friend-btn-group.component';

describe('FriendBtnGroupComponent', () => {
  let component: FriendBtnGroupComponent;
  let fixture: ComponentFixture<FriendBtnGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendBtnGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendBtnGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
