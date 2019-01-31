import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchedStoryComponent } from './matched-story.component';

describe('MatchedStoryComponent', () => {
  let component: MatchedStoryComponent;
  let fixture: ComponentFixture<MatchedStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchedStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchedStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
