import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosRevolventesComponent } from './gastos-revolventes.component';

describe('GastosRevolventesComponent', () => {
  let component: GastosRevolventesComponent;
  let fixture: ComponentFixture<GastosRevolventesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GastosRevolventesComponent]
    });
    fixture = TestBed.createComponent(GastosRevolventesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
