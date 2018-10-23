import {Injectable, OnInit} from '@angular/core';
import {Http, Response } from '@angular/http';

@Injectable()
export class AuthService {
	static instance : AuthService;
	authToken : string;
	email : string;
	userName :string;
	isLoggedOn : boolean;

	constructor(){
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

	setIsLoggedOn(isLoggedOn : boolean){
		this.isLoggedOn = isLoggedOn;
	}

	getIsLoggedOn()
	{
		return this.isLoggedOn;
	}

}