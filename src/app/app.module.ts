import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { CustomerModule } from './customer/customer.module';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { HeaderComponent } from './component/header-footer/header/header.component';
import { FooterComponent } from './component/header-footer/footer/footer.component';
import { EmployeeService } from './shared/employee.service';
import { AuthService } from './shared/auth.service';
import { MatDialogModule } from '@angular/material';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CustomerModule,
        ReactiveFormsModule,
        AppRoutingModule,
        MatDialogModule
    ],
    declarations: [
        AppComponent,
        WelcomeComponent,
        NavbarComponent,
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        FooterComponent,
    ],
    // entryComponents: [RegisterComponent, LoginComponent],
    providers: [EmployeeService, AuthService],
    bootstrap: [AppComponent],
})

export class AppModule { }