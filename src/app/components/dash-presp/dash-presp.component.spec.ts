import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashPrespComponent } from './dash-presp.component';

describe('DashPrespComponent', () => {
  let component: DashPrespComponent;
  let fixture: ComponentFixture<DashPrespComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashPrespComponent]
    });
    fixture = TestBed.createComponent(DashPrespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
