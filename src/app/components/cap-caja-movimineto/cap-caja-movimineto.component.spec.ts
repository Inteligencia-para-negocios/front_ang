import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapCajaMoviminetoComponent } from './cap-caja-movimineto.component';

describe('CapCajaMoviminetoComponent', () => {
  let component: CapCajaMoviminetoComponent;
  let fixture: ComponentFixture<CapCajaMoviminetoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CapCajaMoviminetoComponent]
    });
    fixture = TestBed.createComponent(CapCajaMoviminetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
