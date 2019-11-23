import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrLandingPage } from './qr-landing.page';

describe('QrLandingPage', () => {
  let component: QrLandingPage;
  let fixture: ComponentFixture<QrLandingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrLandingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrLandingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
