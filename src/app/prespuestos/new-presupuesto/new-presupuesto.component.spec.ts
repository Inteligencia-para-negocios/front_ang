import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPresupuestoComponent } from './new-presupuesto.component';

describe('NewPresupuestoComponent', () => {
  let component: NewPresupuestoComponent;
  let fixture: ComponentFixture<NewPresupuestoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewPresupuestoComponent]
    });
    fixture = TestBed.createComponent(NewPresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
