import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGastosComponent } from './view-gastos.component';

describe('ViewGastosComponent', () => {
  let component: ViewGastosComponent;
  let fixture: ComponentFixture<ViewGastosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGastosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
