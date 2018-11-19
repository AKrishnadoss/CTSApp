import {Injectable, OnInit} from '@angular/core';
import {Http, Response } from '@angular/http';
import {LoggerService} from './LoggerService';
import { HttpClient } from '@angular/common/http';

import { AuthFunctions } from '../model/AuthFunctions';

@Injectable()
export class AuthService {
	static instance : AuthService;
	authToken : string;
	email : string;
	userName :string;
	isLoggedOn : boolean;
    expiresBy: Date;
    roles: string;
    authFunctions: AuthFunctions;

    constructor(private _loggerService: LoggerService,
        private _http: HttpClient) {
		if ( AuthService.instance == null){
			AuthService.instance = this;
		}
		return AuthService.instance;
	}

	setAuthToken(token : string){
		this.authToken = token;
	}

	getAuthToken()
	{
		return this.authToken;
	}

	setEmail(email : string){
		this.email = email;
	}

	getEmail()
	{
		return this.email;
	}

	setUserName(userName : string){
		this.userName = userName;
	}

	getUserName()
	{
		return this.userName;
	}

	getIsLoggedOn() : boolean
	{
		if (this.authToken != null && this.authToken.length > 0 && this.expiresBy >= new Date())
		{
			this._loggerService.log("getIsLoggedOn() = true");
			return true;
		}
		this._loggerService.log("getIsLoggedOn() = false");
		return false;
	}

	setExpiresBy(expiresBy: Date){
		this.expiresBy = expiresBy;
	}

	getExpiresBy(){
		return this.expiresBy;
    }


    hasAccess(fnName: string): boolean {
        let allowed = false;
        this.getAuthFunctions();
        if (this.authFunctions != null && this.authFunctions.functions != null && this.authFunctions.functions.length > 0) {
            var item  = this.authFunctions.functions.find(x => x == fnName);
            if (item != null) {
                allowed = true;
            }
        }
        return allowed;
    }

    getAuthFunctions() {
        if (this.authFunctions == null) {
            this.callAuthFunctionsService()
                .subscribe(result => {
                    //this._loggerService.log(JSON.stringify(result));
                    this.authFunctions = result;
                },
                    err => {
                        this._loggerService.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
                        // Redirect to error page
                    });
        }
    }

    callAuthFunctionsService() {
        return this._http.get<AuthFunctions>('/api/ctsuser/authfunctions');
    }
}