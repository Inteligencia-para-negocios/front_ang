import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthGastosComponent } from './auth-gastos.component';

describe('AuthGastosComponent', () => {
  let component: AuthGastosComponent;
  let fixture: ComponentFixture<AuthGastosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthGastosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
