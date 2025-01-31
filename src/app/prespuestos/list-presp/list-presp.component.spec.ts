import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPrespComponent } from './list-presp.component';

describe('ListPrespComponent', () => {
  let component: ListPrespComponent;
  let fixture: ComponentFixture<ListPrespComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPrespComponent]
    });
    fixture = TestBed.createComponent(ListPrespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
