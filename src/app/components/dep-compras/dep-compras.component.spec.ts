import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepComprasComponent } from './dep-compras.component';

describe('DepComprasComponent', () => {
  let component: DepComprasComponent;
  let fixture: ComponentFixture<DepComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepComprasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
