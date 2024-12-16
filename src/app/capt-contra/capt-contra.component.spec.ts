import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptContraComponent } from './capt-contra.component';

describe('CaptContraComponent', () => {
  let component: CaptContraComponent;
  let fixture: ComponentFixture<CaptContraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaptContraComponent]
    });
    fixture = TestBed.createComponent(CaptContraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
