import {Component, OnInit} from '@angular/core'
import { AuthService } from '../../services/AuthService';
import { CalendarService } from '../../services/CalendarService';
import { CalendarWeek } from '../../model/CalendarWeek';
import { Observable } from 'rxjs';
import { GradeService } from '../../services/GradeService';
import { Grade } from '../../model/Grade';
import { TeacherService } from '../../services/TeacherService';
import { Teacher } from '../../model/Teacher';

@Component ({
	templateUrl : './attendance.html'
})
export class AttendanceComponent  implements OnInit {

	pageTitle = "Attendance";
	userName = '';
    isLoggedOn: boolean;
    CalendarWeeks: CalendarWeek[];
    Grades: Grade[];
	Teachers : Teacher[];

	isSelectCalendarWeekLoading:boolean;
	isSelectGradeLoading : boolean;
	isSelectTeacherLoading : boolean;
	showStudentWeekGradeGrid : boolean;

    // Search criteria
    calendarWeekId: number;
    ctsGrade: string;
    teacherId: number;

    constructor(private _authService: AuthService,
        private _calendarService: CalendarService,
        private _gradeService: GradeService,
		private _teacherService: TeacherService) {
	}

	ngOnInit(){
		this.isLoggedOn = this._authService.getIsLoggedOn();
		if ( this.isLoggedOn == false){
			window.location.href = "/logon/login";
			return;
		}

        this.userName = this._authService.getUserName();
		
		this.isSelectCalendarWeekLoading = false;
		this.isSelectGradeLoading = false;
		this.isSelectTeacherLoading = false;
		this.showStudentWeekGradeGrid = false;

		this.calendarWeekId = 0;
		this.ctsGrade = "";
		this.teacherId = 0;

        this.getCalendarWeeks();
        this.getGrades();
    }
    getGrades() {
		this.isSelectGradeLoading = true;
        this._gradeService.getGrades()
            .subscribe(result => {
				this.isSelectGradeLoading = false;
                this.Grades = result;
            },
            err => {
				this.isSelectGradeLoading = false;
                console.log("Error occurred : Code=" + err.status + ",Error="+err.statusText);
				if ( err.status == "404")
				{
					// data not found
					this.Grades = null;
				}
            });
    }

    getCalendarWeeks() {
		this.isSelectCalendarWeekLoading = true;
        this._calendarService.getCalendarWeeks()
            .subscribe(result => {
				this.isSelectCalendarWeekLoading = false;
                this.CalendarWeeks = result;
            },
            err => {
				this.isSelectCalendarWeekLoading = false;
                console.log("Error occurred : Code=" + err.status + ",Error="+err.statusText);
				if ( err.status == "404")
				{
					// data not found
					this.CalendarWeeks = null;
				}
            });
    }

    onSelectCalendarWeek(value : any) {
        this.calendarWeekId = value;
		console.log("selected calendarWeekId = " + value);
		this.displayStudentWeekGradeGrid();
    }

    onSelectGrade(value: any) {
        console.log("selected grade = " + value);
		this.Teachers = null;
        this.ctsGrade = value;
		if ( value != "0"){
			this.isSelectTeacherLoading = true;
			this.getTeachersByGrade(this.ctsGrade);
			this.isSelectTeacherLoading = false;
		}
		this.displayStudentWeekGradeGrid();
    }

	onSelectTeacher(value:any){
		this.teacherId = value;
		console.log("selected teacherId = " + value);
		this.displayStudentWeekGradeGrid();
	}

	getTeachersByGrade(grade : string) {
        this._teacherService.getTeachersByGrade(grade)
            .subscribe(result => {
                this.Teachers = result;
            },
            err => {
				console.log("Error occurred : Code=" + err.status + ",Error="+err.statusText);
				if ( err.status == "404")
				{
					// data not found
					this.Teachers = null;
				}
            });
    }

	displayStudentWeekGradeGrid(){
		console.log(this.calendarWeekId);
		console.log(this.teacherId);
		if ( this.calendarWeekId != 0 && this.teacherId != 0){
			this.showStudentWeekGradeGrid = true;
		}
		else {
			this.showStudentWeekGradeGrid = false;
		}
	}
 }
