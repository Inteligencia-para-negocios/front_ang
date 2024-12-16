import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCComponent } from './report-c.component';

describe('ReportCComponent', () => {
  let component: ReportCComponent;
  let fixture: ComponentFixture<ReportCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
