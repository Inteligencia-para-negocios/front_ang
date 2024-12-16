import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthTesoreriaComponent } from './auth-tesoreria.component';

describe('AuthTesoreriaComponent', () => {
  let component: AuthTesoreriaComponent;
  let fixture: ComponentFixture<AuthTesoreriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthTesoreriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthTesoreriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
