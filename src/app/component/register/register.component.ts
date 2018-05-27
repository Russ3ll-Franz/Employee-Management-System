import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../shared/employee.service';
import { MatSnackBar } from '@angular/material';


@Component({
    templateUrl: 'register.component.html',
    styles: [`
    .form-control-password {
      position: relative;
      top: -30px;
      left: -5px;
      cursor: pointer;
  },
  .button {
    cursor:pointer;
  }
    `]
})

export class RegisterComponent implements OnInit {
    password: boolean = false;
    registerForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        public snackBar: MatSnackBar,
        private employeeService: EmployeeService
    ) { }

    ngOnInit() {
        this.registerForm = this.fb.group({
            id: [0],
            email: [null, [Validators.required, Validators.email]],
            firstName: [null, [Validators.required, Validators.minLength(3)]],
            lastName: [null, [Validators.required, Validators.minLength(3)]],
            password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
            role: [null, [Validators.required, Validators.minLength(3)]],
            color: [null, [Validators.required]],
            country: [null, [Validators.required]],
            status: [null, [Validators.required]],
        });
    }

    togglePassword() {
        this.password = !this.password;
    }

    register() {
        this.employeeService.register(this.registerForm.value);
        this.router.navigate(['/login']);
        console.log('registered Successfully!!');
        let snackBarRef = this.snackBar.open('Registerd Successfully!',
            'Got it!', {
                duration: 3000,
                verticalPosition: 'bottom',
                horizontalPosition: 'right',
            });
    }

    cancel() {
        this.router.navigate(['/welcome']);
    }
}
