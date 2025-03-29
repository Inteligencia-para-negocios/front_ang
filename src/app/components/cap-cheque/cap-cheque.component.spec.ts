import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapChequeComponent } from './cap-cheque.component';

describe('CapChequeComponent', () => {
  let component: CapChequeComponent;
  let fixture: ComponentFixture<CapChequeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapChequeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
