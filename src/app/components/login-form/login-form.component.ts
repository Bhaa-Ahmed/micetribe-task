import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  private fb = inject(FormBuilder);

  private userNamePattern = "^[a-z0-9._]+$";
  private emailPattern = "^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$";
  private passwordPattern = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\\$%\\^&])[a-zA-Z0-9_!@#\\$%\\^&]{8,}$";
    
  readonly loginForm = this.fb.group({
    firstName: this.fb.control<string>("", [Validators.required, Validators.pattern(this.userNamePattern)]),
    lastName: this.fb.control<string>("", [Validators.required, Validators.pattern(this.userNamePattern)]),
    email: this.fb.control<string>("", [Validators.required, Validators.pattern(this.emailPattern)]),
    password: this.fb.control<number | null>(null, [Validators.required, Validators.pattern(this.passwordPattern)]),
    address: this.fb.control<string>("", [Validators.required]),
    gender: this.fb.control<string>("", [Validators.required]),
    country: this.fb.control<string>("", [Validators.required]),
    termsAndConditions: this.fb.control<boolean>(false),
  },
  { updateOn: 'blur' }
)
}
