import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private readonly auth: AuthService,
    private router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly toastService: HotToastService
  ) {}

  ngOnInit() {
    this.initRegisterForm();
  }

  // Initialize the login form
  initRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      height: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });
  }

  register() {
    console.log(this.registerForm.value);
    this.auth.signUp(this.registerForm.value).subscribe(
      (result: any) => {
        this.toastService.success('Registration successful, Please Login');
        this.registerForm.reset();
        this.router.navigate(['/']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
