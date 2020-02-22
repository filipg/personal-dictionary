import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

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
    console.log(this.form.value);
  }
}
