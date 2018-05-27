import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { EmployeeService } from '../../shared/employee.service';
import { MatSnackBar } from '@angular/material';

@Component({
  templateUrl: 'login.component.html',
  styles: [`
    .form-control-password {
      position: relative;
      top: -30px;
      left: -5px;
      cursor: pointer;
  },
  `]
})
export class LoginComponent implements OnInit {
  password: boolean = false;
  loginForm: FormGroup;
  islogoutSuceeded: boolean;
  fullImage: string;


  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private employeeService: EmployeeService
  ) {
    this.fullImage = 'src/assets/images/employee.png';
  }

  ngOnInit() {
    this.authService.onLoginSuccess.next();
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
    });
  }

  togglePassword() {
    this.password = !this.password;
  }

  login() {

    let elements = this.authService.login(this.loginForm.value.email, this.loginForm.value.password);

    if (!elements) return;
    this.authService.onLoginSuccess.next('yay i am admin now')
    this.router.navigate(['/customer']);
    console.log('loggedin Successfully!!');

    let snackBarRef = this.snackBar.open('loggedin Successfully!',
      'Got it!', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
      });
  }

  cancel() {
    this.router.navigate(['/register']);
  }
}


