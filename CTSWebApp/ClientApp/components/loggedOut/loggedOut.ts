import { Component, OnInit, PACKAGE_ROOT_URL } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/AuthService';
import { LoggerService } from '../../services/LoggerService';

@Component({
    templateUrl: './loggedOut.html'
})
export class LoggedOutComponent implements OnInit {
    constructor(private _router: Router) {

    }

    ngOnInit() {
    }

    loginClick() {
        window.location.href = "/logon/login";
    }

    homeClick() {
        this._router.navigate(["home"]);
    }
}