import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { By } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

describe('LoginFormComponent', () => {
  const toastrService = {};

  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormComponent],
      providers: [{ provide: ToastrService, useValue: toastrService }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have undo button as disabled on initialization', () => {
    const undoBtn = fixture.debugElement.query(By.css('#undo-btn'));
    fixture.detectChanges();
    expect(undoBtn.nativeElement.disabled).toBeTrue();
  })

  it('should have redo button as disabled on initialization', () => {
    const redoBtn = fixture.debugElement.query(By.css('#redo-btn'));
    fixture.detectChanges();
    expect(redoBtn.nativeElement.disabled).toBeTrue();
  })
});
