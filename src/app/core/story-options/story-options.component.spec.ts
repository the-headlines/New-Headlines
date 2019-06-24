import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryOptionsComponent } from './story-options.component';

describe('StoryOptionsComponent', () => {
  let component: StoryOptionsComponent;
  let fixture: ComponentFixture<StoryOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
