import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { IEmployee, ISelect } from "../../../shared/repo";
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { EmployeeService } from "../../../shared/employee.service";
import { takeUntil } from "rxjs/operators";
import { ReplaySubject, Subject } from 'rxjs';
import { ConfirmationDelete } from "./confirmation-delete.component";


@Component({
  templateUrl: 'confirmation-edit.component.html',
  styles:[ `
  .mat-button-center{
    
  }
  `]
})
export class ConfirmationEdit implements OnInit, OnDestroy {

  employee: IEmployee[];
  customerForm: FormGroup;
  employeesEdit: IEmployee;

  countryFilterCtrl: FormControl = new FormControl();
  filteredCountries: ReplaySubject<ISelect[]> = new ReplaySubject<ISelect[]>();
  // For Multiple Selection...
  colorFilterCtrl: FormControl = new FormControl();
  filteredColor: ReplaySubject<ISelect[]> = new ReplaySubject<ISelect[]>();

  private _onDestroy = new Subject<void>();

  countryName: ISelect[] = [];
  colorName: ISelect[] = [];



  constructor(
    public fb: FormBuilder,
    public snackBar: MatSnackBar,
    public employeeService: EmployeeService,
    public dialogRef: MatDialogRef<ConfirmationEdit>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: IEmployee) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      role: '',
      color: '',
      status: '',
      country: '',
    });

    if (this.data)
      this.populateForm(this.data);

    // Data from Repository.
    this.countryName = this.employeeService.Country();
    this.colorName = this.employeeService.color();
    // Single Selection.. For Countries
    this.filteredCountries.next(this.countryName.slice());
    this.countryFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy)).subscribe(() => { this.filterCountry(); });

    // Multiple Selection.. For Color..
    this.filteredColor.next(this.colorName.slice());
    this.colorFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy)).subscribe(() => { this.filterColor(); });
  }

  populateForm(d: IEmployee): void {
    if (!d) return;
    this.customerForm.patchValue({
      id: d.id,
      email: d.email,
      firstName: d.firstName,
      lastName: d.lastName,
      password: d.password,
      role: d.role,
      country: d.country,
      color: d.color,
      status: d.status,
    });
  }

  onUpdate() {
    this.employeesEdit = this.employeeService.register(this.customerForm.value);
      this.dialogRef.close('Confirm');
  }

  reset() {
    this.customerForm.reset();
  }

  // Filter color.. 
  filterColor() {
    if (!this.colorName) {
      return;
    }
    let search = this.colorFilterCtrl.value;
    if (!search) {
      this.filteredColor.next(this.colorName.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredColor.next(this.colorName.filter(color => color.name.toLowerCase()
      .indexOf(search) > -1));
  }

  // Filter Color..
  filterCountry() {
    if (!this.countryName) {
      return;
    }
    let search = this.countryFilterCtrl.value;
    if (!search) {
      this.filteredCountries.next(this.countryName.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredCountries.next(this.countryName.filter(country => country.name.toLowerCase()
      .indexOf(search) > -1));
  }


  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

    // confirmation dialog open and close all or cancel do nothing
    openDialogBox() {
      const ref = this.dialog.open(ConfirmationDelete, {
        disableClose: true,
        width: '350px',
        height: '200px',
      });
      this.employeeService.getEmployees()
        .subscribe(res => {
          let customerForm = res;
        });
      ref.beforeClose()
        .subscribe(result => {
          if (result) {
            this.dialogRef.close(false);
          }
        });
    }
  
    dialogMinimize() {
  
    }
}
