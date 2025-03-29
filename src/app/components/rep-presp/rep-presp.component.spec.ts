import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepPrespComponent } from './rep-presp.component';

describe('RepPrespComponent', () => {
  let component: RepPrespComponent;
  let fixture: ComponentFixture<RepPrespComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepPrespComponent]
    });
    fixture = TestBed.createComponent(RepPrespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
