import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchedStoriesComponent } from './matched-stories.component';

describe('MatchedStoriesComponent', () => {
  let component: MatchedStoriesComponent;
  let fixture: ComponentFixture<MatchedStoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchedStoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchedStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
