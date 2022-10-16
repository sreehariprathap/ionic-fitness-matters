import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private readonly auth: AuthService,
    private router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly toast: HotToastService
  ) {}

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  signIn() {
    console.log(this.loginForm.value);
    this.auth.singIn(this.loginForm.value).subscribe((data: any) => {
      console.log(data);
      const accessToken = data.access_token;
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('user_id', data.userId);
      this.auth.loggedInStatus = true;
      this.toast.success('login successful');
      this.router.navigate(['/dashboard/tabs/tab1']);
    });
  }
}
