import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashVerifyComponent } from './splash-verify.component';

describe('SplashVerifyComponent', () => {
  let component: SplashVerifyComponent;
  let fixture: ComponentFixture<SplashVerifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SplashVerifyComponent]
    });
    fixture = TestBed.createComponent(SplashVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
