import { Injectable, ViewChild } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { of } from "rxjs/observable/of";
import { Subject } from "rxjs";
import { REPO } from "./mock-repo";
import { AuthService } from "./auth.service";
import { IEmployee } from "./repo";
import { MatDialogRef, Sort, MatSort, MatPaginator } from "@angular/material";
import { ConfirmationEdit } from "../customer/customer-list/confirmation/confirmation-edit.component";
import { range } from "rxjs/observable/range";
import { map, filter } from "rxjs/operators";

@Injectable()
export class EmployeeService {

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    selected: number[];
    REPO: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        role: string;
        color: string[];
        status: number;
        Country: string;
    }[];

    dialogRef: MatDialogRef<ConfirmationEdit>;
    private subject = new Subject<IEmployee[]>();
    constructor(private auth: AuthService) { }

    getEmployees(): Observable<IEmployee[]> {

        // if (!this.auth.getCurrentUser)
        //     return Observable.of(REPO);

        // let allElements = REPO.find(x => x.role === this.auth.getCurrentUser.role);
        // let element = REPO.filter(x => x.role == 'user' || x.role === 'manager');
        // let user = REPO.filter(x => x.role === 'user');

        // // validate current user role and return data
        // if (allElements.role === 'admin')
        //     return Observable.of(REPO);
        // else if (allElements.role === 'manager') {
        //     return Observable.of(element);
        // }
        // else {
        //     return Observable.of(user);
        // }

        return Observable.of(REPO.slice(0,4));
    }

    getEmployee(id: number): Observable<IEmployee> {
        return Observable.of(REPO.find(x => x.id === id));
    }

    onDeleteClick(id: number): Observable<IEmployee[]> {
        let data = REPO;
        let index = data.findIndex(x => x.id === id);

        if (index > -1) {
            data.splice(index, 1);
        }
        return Observable.of(data);
    }

    deleteMultiple() {
        let data = REPO;
        Observable.range(0, this.selected.length)
            .pipe(
                map(delIndex => data.findIndex(x => x.id === this.selected[delIndex])),
                filter(index => index > -1)
            )
            .subscribe(index => {
                data.splice(index, 1);
            });
    }

    onEditClick(body: IEmployee): Observable<IEmployee[]> {
        let index = REPO.findIndex(x => x.id === body.id);

        if (index > -1) {
            REPO[index] = body;
            this.REPO = this.REPO;
            return Observable.of(REPO);
        } {
            let max = Math.max(...this.REPO.map(x => x.id));
            body.id = max + 1;
            REPO.push(body);
            this.REPO = this.REPO;
            return Observable.of(REPO);
        }
    }

    register(user: any) {
        let max = Math.max(...REPO.map(x => x.id));
        user.id = max + 1;
        REPO.push(user);
        return user;
    }

    getFiltered(x: string) {
        let d = REPO.filter(y => y.id.toString().indexOf(x) > -1 ||
            y.role.toString().indexOf(x) > -1);
        return d.length > 0 ? d : REPO;
    }

    sortData(sort: Sort, start: number, end: number, filtered?: string): Observable<IEmployee[]> {
        let getFiltered = filtered ? REPO.filter(x => x.email.toLowerCase()
            .includes(filtered.toLocaleLowerCase())) : REPO;
        if (!sort.active)
            return Observable.of(getFiltered.slice(start, end));

        getFiltered.sort((a, b) => {
            if (sort.direction === '') {
                return compare(a.id, b.id, true);
            }

            let isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'id': return compare(a.id, b.id, isAsc);
                case 'email': return compare(a.email, b.email, isAsc);
                case 'firstName': return compare(a.firstName, b.firstName, isAsc);
                case 'lastName': return compare(a.lastName, b.lastName, isAsc);
                case 'password': return compare(a.password, b.password, isAsc);
                case 'role': return compare(a.role, b.role, isAsc);
            }
        });
        return Observable.of(getFiltered.slice(start, end));
    }

    Country() {
        return COUNTRY;
    }
    color() {
        return COLOR;
    }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

let COUNTRY = [
    { name: 'Nepal', id: 'A' },
    { name: 'China', id: 'B' },
    { name: 'Bangladesh', id: 'C' },
    { name: 'France', id: 'D' },
    { name: 'USA', id: 'E' },
    { name: 'Italy', id: 'F' },
    { name: 'Germany', id: 'L' },
    { name: 'UK', id: 'M' },
    { name: 'Russia', id: 'N' },
    { name: 'Canada', id: 'O' },
    { name: 'India', id: 'P' },
    { name: 'Bhutan', id: 'Q' },
    { name: 'Finland', id: 'R' },
    { name: 'Iceland', id: 'S' },
    { name: 'Kuwait', id: 'T' },
    { name: 'South Korea', id: 'U' },
    { name: 'Japan', id: 'V' },
    { name: 'Afghanistan', id: 'W' },
    { name: 'Pakistan', id: 'X' },
    { name: 'Maldives', id: 'Y' },
    { name: 'Malaysia', id: 'Z' },
    { name: 'UAE', id: 'AA' },
    { name: 'Qatar', id: 'AB' },
    { name: 'Somalia', id: 'AC' },
    { name: 'North Korea', id: 'AD' },
];

let COLOR = [
    { name: 'red', id: 'A' },
    { name: 'Green', id: 'B' },
    { name: 'Blue', id: 'C' },
    { name: 'Yellow', id: 'D' },
    { name: 'White', id: 'E' },
    { name: 'Black', id: 'F' },
    { name: 'Pink', id: 'G' },
    { name: 'Purple', id: 'H' },
];