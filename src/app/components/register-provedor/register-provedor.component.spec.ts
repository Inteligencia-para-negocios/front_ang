import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProvedorComponent } from './register-provedor.component';

describe('RegisterProvedorComponent', () => {
  let component: RegisterProvedorComponent;
  let fixture: ComponentFixture<RegisterProvedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterProvedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterProvedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
