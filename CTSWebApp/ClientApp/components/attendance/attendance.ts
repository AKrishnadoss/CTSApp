import {Component, OnInit} from '@angular/core'
import {AuthService} from '../../services/AuthService';

@Component ({
	templateUrl : './attendance.html'
})
export class AttendanceComponent  implements OnInit {

	pageTitle = "Attendance";
	userName = '';
	isLoggedOn : boolean;

	constructor(private _authService: AuthService){
	}

	ngOnInit(){
		this.isLoggedOn = this._authService.getIsLoggedOn();
		if ( this.isLoggedOn == false){
			window.location.href = "/logon/login";
			return;
		}

		this.userName = this._authService.getUserName();
	}

 }
