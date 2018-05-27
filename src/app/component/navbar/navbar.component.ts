import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { RegisterComponent } from '../register/register.component';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';

@Component({
  moduleId: module.id,
  selector: 'nav-bar',
  templateUrl: 'navbar.component.html',
  styles: [`
  .bg-light {
    border-top: 2px solid #867c7c;
    border-bottom: 2px solid #867c7c;
    border-left: 2px solid #867c7c;
    border-right: 2px solid #867c7c;
}
  `]
  // background-color: #d8dde2 !important;
})
export class NavbarComponent {

  isloginSuceeded: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngAfterViewInit() {
    this.authService.onLoginSuccess.subscribe(x => {
      this.isloginSuceeded = x !== undefined;
    })
  }
}

