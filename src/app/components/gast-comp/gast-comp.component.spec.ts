import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastCompComponent } from './gast-comp.component';

describe('GastCompComponent', () => {
  let component: GastCompComponent;
  let fixture: ComponentFixture<GastCompComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GastCompComponent]
    });
    fixture = TestBed.createComponent(GastCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
