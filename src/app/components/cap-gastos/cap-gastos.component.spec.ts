import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapGastosComponent } from './cap-gastos.component';

describe('CapGastosComponent', () => {
  let component: CapGastosComponent;
  let fixture: ComponentFixture<CapGastosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapGastosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
