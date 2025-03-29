import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyPriceComponent } from './verify-price.component';

describe('VerifyPriceComponent', () => {
  let component: VerifyPriceComponent;
  let fixture: ComponentFixture<VerifyPriceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyPriceComponent]
    });
    fixture = TestBed.createComponent(VerifyPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
