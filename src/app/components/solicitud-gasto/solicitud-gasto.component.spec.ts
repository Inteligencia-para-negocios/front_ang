import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudGastoComponent } from './solicitud-gasto.component';

describe('SolicitudGastoComponent', () => {
  let component: SolicitudGastoComponent;
  let fixture: ComponentFixture<SolicitudGastoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudGastoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
