import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegEmpleadoComponent } from './reg-empleado.component';

describe('RegEmpleadoComponent', () => {
  let component: RegEmpleadoComponent;
  let fixture: ComponentFixture<RegEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegEmpleadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
