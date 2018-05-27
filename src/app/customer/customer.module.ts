import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CustomerRoutingModule } from "./customer-routing.module";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { ConfirmationDelete } from "./customer-list/confirmation/confirmation-delete.component";
import { ConfirmationEdit } from "./customer-list/confirmation/confirmation-edit.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatRadioModule,
    MatListModule,
    MatExpansionModule,
    MatTableModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
} from "@angular/material";
import { EmployeeService } from "../shared/employee.service";
import { ExpansionComponent } from "./customer-list/expand/expansion.component";

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        CustomerRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatDialogModule,
        MatCardModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSnackBarModule,
        MatSortModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatRadioModule,
        MatListModule,
        MatExpansionModule,
        MatTableModule,
        MatMenuModule, 
        MatFormFieldModule, 
        MatSelectModule,
        NgxMatSelectSearchModule
    ],
    declarations: [
        CustomerListComponent,
        ConfirmationDelete,
        ConfirmationEdit,
        ExpansionComponent 

    ],

    entryComponents: [
        ExpansionComponent,
        ConfirmationDelete,
        ConfirmationEdit],

    providers: [EmployeeService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomerModule { }