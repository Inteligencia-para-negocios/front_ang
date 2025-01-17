import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionPresupuestoComponent } from './asignacion-presupuesto.component';

describe('AsignacionPresupuestoComponent', () => {
  let component: AsignacionPresupuestoComponent;
  let fixture: ComponentFixture<AsignacionPresupuestoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignacionPresupuestoComponent]
    });
    fixture = TestBed.createComponent(AsignacionPresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
