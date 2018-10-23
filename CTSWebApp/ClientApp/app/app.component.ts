import { Component,OnInit } from '@angular/core';
import {AuthService} from '../services/AuthService';


@Component({
  selector: 'ctsApp',
  templateUrl: 'app.component.html'
})
export class AppComponent  implements OnInit {
  pageTitle = 'Home Page';

  token: string;
  userName : string;
  email: string;
  
  isLogonSuccessful : boolean

  constructor(private _authService: AuthService)
  {
  
  }

  ngOnInit(){

	var tokenElement = document.getElementById("hdnToken");
	if ( tokenElement != null){
		this.token = tokenElement.innerText;
	}

	var emailElement = document.getElementById("hdnEmail");
	if ( emailElement != null){
		this.email = emailElement.innerText;
	}

	var userNameElement = document.getElementById("hdnUserName");
	if ( userNameElement != null){
		this.userName = userNameElement.innerText;
	}

	var loginLinkElement = document.getElementById("loginLink");
	var logoutLinkElement = document.getElementById("logoutLink");
	var loggedinElement = document.getElementById("loggedInAs");

	if ( this.token == null ){
		console.log('token is null, getting from localStorage');
		this.token = localStorage.getItem('token');
		this.userName = localStorage.getItem('userName');
		this.email = localStorage.getItem('email');

		if ( this.token != null ){
		console.log('localStorage is NOT null');
			if ( loggedinElement != null){
				loggedinElement.innerText = this.email;
			}
		
			if ( loginLinkElement != null){
				loginLinkElement.style.display = "none";
			}
		
			if ( logoutLinkElement != null){
				logoutLinkElement.style.display = "block";
			}

			this.isLogonSuccessful = true;

			this._authService.setAuthToken(this.token);
			this._authService.setEmail(this.email);
			this._authService.setUserName(this.userName);
			this._authService.setIsLoggedOn(true);
		}
		else {
		console.log('localStorage is null');
			this.isLogonSuccessful = false;
			this._authService.setAuthToken('');
			this._authService.setEmail('');
			this._authService.setUserName('');
			this._authService.setIsLoggedOn(false);
		}

	}
	else {
		console.log('token is NOT null, setting into localStorage');

		localStorage.setItem('token', this.token);
		localStorage.setItem('userName', this.userName);
		localStorage.setItem('email', this.email);

		if ( loggedinElement != null){
			loggedinElement.innerText = this.email;
		}
		
		if ( loginLinkElement != null){
			loginLinkElement.style.display = "none";
		}
		
		if ( logoutLinkElement != null){
			logoutLinkElement.style.display = "block";
		}

		this.isLogonSuccessful = true;
		this._authService.setAuthToken(this.token);
		this._authService.setEmail(this.email);
		this._authService.setUserName(this.userName);
		this._authService.setIsLoggedOn(true);
	}
  }
}
