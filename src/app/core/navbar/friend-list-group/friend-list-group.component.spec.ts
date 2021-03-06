import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendListGroupComponent } from './friend-list-group.component';

describe('FriendListGroupComponent', () => {
  let component: FriendListGroupComponent;
  let fixture: ComponentFixture<FriendListGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendListGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendListGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
