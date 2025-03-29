import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicidadVerifyComponent } from './publicidad-verify.component';

describe('PublicidadVerifyComponent', () => {
  let component: PublicidadVerifyComponent;
  let fixture: ComponentFixture<PublicidadVerifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicidadVerifyComponent]
    });
    fixture = TestBed.createComponent(PublicidadVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
