import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.parent.errors && control.parent.errors['notSame'];
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  loading: boolean;
  error = null;

  matcher = new MyErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required],
      'confirm': ['', Validators.required]
    }, {validators: this.checkPasswords});
  }

  private checkPasswords(group: FormGroup): {notSame: boolean} {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirm').value;

    return password === confirmPassword ? null : { notSame: true };
  }

  onSubmit() {
    this.loading = true;
    this.authService.signup(this.form.value.email, this.form.value.password).subscribe(data => {
      this.loading = false;
      this.router.navigate(['/dashboard']);
    }, errorMessage => {
      this.loading = false;
      this.error = errorMessage;
    });
  }
}
