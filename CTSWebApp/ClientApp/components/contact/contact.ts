import {Component, OnInit} from '@angular/core'

import {AuthService} from '../../services/AuthService';

@Component ({
	templateUrl : './contact.html'
})
export class ContactComponent implements OnInit {

	pageTitle = "Contact Us";
	userName = '';
	isLoggedOn : boolean;

	constructor(private _authService: AuthService){
	}

	ngOnInit(){
		this.isLoggedOn = this._authService.getIsLoggedOn();
		this.userName = this._authService.getUserName();
	}
}