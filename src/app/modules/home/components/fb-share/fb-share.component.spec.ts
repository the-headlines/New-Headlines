import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FblikeComponent } from './fb-share.component';

describe('FblikeComponent', () => {
  let component: FblikeComponent;
  let fixture: ComponentFixture<FblikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FblikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FblikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
