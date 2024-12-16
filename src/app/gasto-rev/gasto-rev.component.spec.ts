import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastoRevComponent } from './gasto-rev.component';

describe('GastoRevComponent', () => {
  let component: GastoRevComponent;
  let fixture: ComponentFixture<GastoRevComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GastoRevComponent]
    });
    fixture = TestBed.createComponent(GastoRevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
