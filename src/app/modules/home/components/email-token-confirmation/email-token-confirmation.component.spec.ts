import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailTokenConfirmationComponent } from './email-token-confirmation.component';

describe('EmailTokenConfirmationComponent', () => {
  let component: EmailTokenConfirmationComponent;
  let fixture: ComponentFixture<EmailTokenConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailTokenConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailTokenConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
