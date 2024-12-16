import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutListComponent } from './cut-list.component';

describe('CutListComponent', () => {
  let component: CutListComponent;
  let fixture: ComponentFixture<CutListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CutListComponent]
    });
    fixture = TestBed.createComponent(CutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
