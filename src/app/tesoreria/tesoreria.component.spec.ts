import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesoreriaComponent } from './tesoreria.component';

describe('TesoreriaComponent', () => {
  let component: TesoreriaComponent;
  let fixture: ComponentFixture<TesoreriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TesoreriaComponent]
    });
    fixture = TestBed.createComponent(TesoreriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
