import {Component, OnInit} from '@angular/core'
import { AuthService } from '../../services/AuthService';
import { CalendarService } from '../../services/CalendarService';
import { CalendarWeek } from '../../model/CalendarWeek';
import { Observable } from 'rxjs';
import { GradeService } from '../../services/GradeService';
import { Grade } from '../../model/Grade';


@Component ({
	templateUrl : './attendance.html'
})
export class AttendanceComponent  implements OnInit {

	pageTitle = "Attendance";
	userName = '';
    isLoggedOn: boolean;
    CalendarWeeks: CalendarWeek[];
    Grades: Grade[];

    // Search criteria
    calendarWeekId: number;
    ctsGrade: string;
    teacherId: number;

    constructor(private _authService: AuthService,
        private _calendarService: CalendarService,
        private _gradeService: GradeService) {
	}

	ngOnInit(){
		this.isLoggedOn = this._authService.getIsLoggedOn();
		if ( this.isLoggedOn == false){
			window.location.href = "/logon/login";
			return;
		}

        this.userName = this._authService.getUserName();
        this.getCalendarWeeks();
        this.getGrades();
    }
    getGrades() {
        this._gradeService.getGrades()
            .subscribe(result => {
                this.Grades = result;
            },
                err => {
                    console.log(err.error);
                });
    }
    getCalendarWeeks() {
        this._calendarService.getCalendarWeeks()
            .subscribe(result => {
                this.CalendarWeeks = result;
            },
                err => {
                    console.log(err.error);
                });
    }

    onSelectCalendarWeek(value : any) {
        console.log(value);
        this.calendarWeekId = value;
    }

    onSelectGrade(value: any) {
        console.log(value);
        this.ctsGrade = value;
    }
 }
