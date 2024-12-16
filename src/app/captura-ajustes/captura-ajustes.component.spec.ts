import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaAjustesComponent } from './captura-ajustes.component';

describe('CapturaAjustesComponent', () => {
  let component: CapturaAjustesComponent;
  let fixture: ComponentFixture<CapturaAjustesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CapturaAjustesComponent]
    });
    fixture = TestBed.createComponent(CapturaAjustesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
