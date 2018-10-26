import {Component, OnInit} from '@angular/core'
import { AuthService } from '../../services/AuthService';
import { CalendarService } from '../../services/CalendarService';
import { CalendarWeek } from '../../model/CalendarWeek';

@Component ({
	templateUrl : './attendance.html'
})
export class AttendanceComponent  implements OnInit {

	pageTitle = "Attendance";
	userName = '';
    isLoggedOn: boolean;
    CalendarWeeks: CalendarWeek[] ;

    constructor(private _authService: AuthService,
        private _calendarService: CalendarService) {
	}

	ngOnInit(){
		this.isLoggedOn = this._authService.getIsLoggedOn();
		if ( this.isLoggedOn == false){
			window.location.href = "/logon/login";
			return;
		}

        this.userName = this._authService.getUserName();
        this.CalendarWeeks = this._calendarService.getCalendarWeeks();
	}

 }
