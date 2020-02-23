import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  loading: boolean;

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
    });
  }

  onSubmit() {
    this.loading = true;
    this.authService.signup(this.form.value.email, this.form.value.password).subscribe(data => {
      console.log(data);
      this.loading = false;
      this.router.navigate(['/dashboard']);
    }, error => {
      console.log(error);
      // toDo: error handling
    });
  }
}
