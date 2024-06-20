import { AsyncPipe, NgClass } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HistoryArray } from '../../enums/enums';
import { FormService } from '../../services/form.service';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, AsyncPipe],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  private fb = inject(FormBuilder);
  private formService = inject(FormService);
  private destroyRef = inject(DestroyRef);

  readonly historyArrayEnum = HistoryArray;

  private userNamePattern = "^[a-z0-9._]+$";
  private emailPattern = "^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$";
  private passwordPattern = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\\$%\\^&])[a-zA-Z0-9_!@#\\$%\\^&]{8,}$";

  readonly isUndoButtonDisabled$ = this.formService.undoArrayLength$.pipe(map(length => length > 1));
  readonly isRedoButtonDisabled$ = this.formService.redoArrayLength$.pipe(map(length => Boolean(length)));
  
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

  ngOnInit(): void {
    this.initializeHistoryState();
  }

  initializeHistoryState() {
    this.formService.addNewFormValue(JSON.stringify(this.loginForm.value), this.historyArrayEnum.UndoArray);

    this.loginForm.valueChanges.pipe(
      map(formValue => JSON.stringify(formValue)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(formValue => this.formService.addNewFormValue(formValue, this.historyArrayEnum.UndoArray));
  }

  dispatchFormChange(historyArrayEnum: HistoryArray) {
    const formValue = this.formService.getFormValue(historyArrayEnum);

    if(!formValue) {
      return
    }
    this.loginForm.patchValue(JSON.parse(formValue));
  }
}
