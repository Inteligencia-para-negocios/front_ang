import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciboEfeXComponent } from './recibo-efe-x.component';

describe('ReciboEfeXComponent', () => {
  let component: ReciboEfeXComponent;
  let fixture: ComponentFixture<ReciboEfeXComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReciboEfeXComponent]
    });
    fixture = TestBed.createComponent(ReciboEfeXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
