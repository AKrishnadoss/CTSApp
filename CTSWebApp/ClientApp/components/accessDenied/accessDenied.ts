import { Component, OnInit, PACKAGE_ROOT_URL } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/AuthService';
import { LoggerService } from '../../services/LoggerService';

@Component({
    templateUrl: './accessDenied.html'
})
export class AccessDeniedComponent implements OnInit {
    constructor(private _router: Router) {

    }

    ngOnInit() {
    }

    homeClick() {
        this._router.navigate(["home"]);
    }
}