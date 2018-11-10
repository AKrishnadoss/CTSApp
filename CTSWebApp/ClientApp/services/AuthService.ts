import {Injectable, OnInit} from '@angular/core';
import {Http, Response } from '@angular/http';
import {LoggerService} from './LoggerService';

@Injectable()
export class AuthService {
	static instance : AuthService;
	authToken : string;
	email : string;
	userName :string;
	isLoggedOn : boolean;
	expiresBy : Date;

	constructor(private _loggerService: LoggerService){
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

	//setIsLoggedOn(isLoggedOn : boolean){
	//	this.isLoggedOn = isLoggedOn;
	//}

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

}