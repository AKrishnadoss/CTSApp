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


    async hasAccess(fnName: string): Promise<boolean> {
        let allowed = false;
        if (this.authFunctions == null) {
            await this.callAuthFunctionsService()
                .then((result) => {
                    this.authFunctions = result;

                    if (this.authFunctions != null && this.authFunctions.functions != null && this.authFunctions.functions.length > 0) {
                        var item = this.authFunctions.functions.find(x => x == fnName);
                        if (item != null) {
                            allowed = true;
                        }
                        return allowed;
                    }
                });
        }
        else {
            if (this.authFunctions != null && this.authFunctions.functions != null && this.authFunctions.functions.length > 0) {
                var item = this.authFunctions.functions.find(x => x == fnName);
                if (item != null) {
                    allowed = true;
                }
            }
        }
        return allowed;
    }

    async callAuthFunctionsService() {
        if (this.authFunctions == null) {
            let promise = new Promise < AuthFunctions>(() => {
                this._http.get<AuthFunctions>('/api/ctsuser/authfunctions')
                    .toPromise()
            });
            return promise;
        }
    }

    getAuthFunctions() {
        return this._http.get<AuthFunctions>('/api/ctsuser/authfunctions');
    }
}