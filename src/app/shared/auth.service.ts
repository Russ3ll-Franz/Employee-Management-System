import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { IEmployee } from './repo';
import { REPO } from './mock-repo';

@Injectable()
export class AuthService {
    onLoginSuccess = new Subject();
    private hasLoggedin: IEmployee;

    get getCurrentUser() {
        return this.hasLoggedin;
    }

    login(email: string, password: string) {
        let el = REPO.find(x => x.email === email && x.password === password);
        this.hasLoggedin = el;
        return el;
    }
}
