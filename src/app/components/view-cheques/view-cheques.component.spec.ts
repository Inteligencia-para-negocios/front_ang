import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChequesComponent } from './view-cheques.component';

describe('ViewChequesComponent', () => {
  let component: ViewChequesComponent;
  let fixture: ComponentFixture<ViewChequesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewChequesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewChequesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
