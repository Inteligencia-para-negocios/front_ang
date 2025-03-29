import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapTransferComponent } from './cap-transfer.component';

describe('CapTransferComponent', () => {
  let component: CapTransferComponent;
  let fixture: ComponentFixture<CapTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapTransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
