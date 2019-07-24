import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbyistComponent } from './hobbyist.component';

describe('HobbyistComponent', () => {
  let component: HobbyistComponent;
  let fixture: ComponentFixture<HobbyistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HobbyistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HobbyistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
