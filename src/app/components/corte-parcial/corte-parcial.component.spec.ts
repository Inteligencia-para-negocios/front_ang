import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorteParcialComponent } from './corte-parcial.component';

describe('CorteParcialComponent', () => {
  let component: CorteParcialComponent;
  let fixture: ComponentFixture<CorteParcialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorteParcialComponent]
    });
    fixture = TestBed.createComponent(CorteParcialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
