import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchOthersModalComponent } from './match-others-modal.component';

describe('MatchOthersModalComponent', () => {
  let component: MatchOthersModalComponent;
  let fixture: ComponentFixture<MatchOthersModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchOthersModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchOthersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
