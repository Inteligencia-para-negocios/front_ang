import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEfexComponent } from './detalle-efex.component';

describe('DetalleEfexComponent', () => {
  let component: DetalleEfexComponent;
  let fixture: ComponentFixture<DetalleEfexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleEfexComponent]
    });
    fixture = TestBed.createComponent(DetalleEfexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
