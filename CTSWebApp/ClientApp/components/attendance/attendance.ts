import {Component, OnInit} from '@angular/core'
import { AuthService } from '../../services/AuthService';
import { CalendarService } from '../../services/CalendarService';
import { CalendarWeek } from '../../model/CalendarWeek';
import { Observable } from 'rxjs';
import { GradeService } from '../../services/GradeService';
import { Grade } from '../../model/Grade';
import { TeacherService } from '../../services/TeacherService';
import { Teacher } from '../../model/Teacher';
import { StudentWeekGrade } from '../../model/StudentWeekGrade';

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
	StudentWeekGrades : StudentWeekGrade[];
	Scores : number[];

	isSelectCalendarWeekLoading:boolean;
	isSelectGradeLoading : boolean;
	isSelectTeacherLoading : boolean;
	isStudentWeekGradeGridLoading :boolean;
	showStudentWeekGradeGrid : boolean;
	showStudentGridServerMessage : boolean;
	studentGridServerMessage : string;

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
		
		this.Scores = [0,1,2,3,4,5,6,7,8,9,10];

		this.isSelectCalendarWeekLoading = false;
		this.isSelectGradeLoading = false;
		this.isSelectTeacherLoading = false;
		this.isStudentWeekGradeGridLoading = false;
		this.showStudentWeekGradeGrid = false;
		this.showStudentGridServerMessage = false;

		this.calendarWeekId = 0;
		this.ctsGrade = "";
		this.teacherId = 0;

        this.getCalendarWeeks();
        this.getGrades();
    }

	populateScores(){
		this.Scores.push(0);
		this.Scores.push(1);
		this.Scores.push(2);
		this.Scores.push(3);
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
		//console.log("selected calendarWeekId = " + value);
		this.displayStudentWeekGradeGrid();
    }

    onSelectGrade(value: any) {
        //console.log("selected grade = " + value);
		this.studentGridServerMessage = "";
		this.showStudentGridServerMessage = false;
		this.Teachers = null;
		this.teacherId = 0;
        this.ctsGrade = value;
		if ( value != "0"){
			this.getTeachersByGrade(this.ctsGrade);
		}
		this.displayStudentWeekGradeGrid();
    }

	onSelectTeacher(value:any){
		this.teacherId = value;
		//console.log("selected teacherId = " + value);
		this.displayStudentWeekGradeGrid();
	}

	getTeachersByGrade(grade : string) {
		this.isSelectTeacherLoading = true;
        this._teacherService.getTeachersByGrade(grade)
            .subscribe(result => {
				this.isSelectTeacherLoading = false;
                this.Teachers = result;
            },
            err => {
				this.isSelectTeacherLoading = false;
				console.log("Error occurred : Code=" + err.status + ",Error="+err.statusText);
				if ( err.status == "404")
				{
					// data not found
					this.Teachers = null;
				}
            });
    }

	displayStudentWeekGradeGrid(){
		if ( this.calendarWeekId != 0 && this.teacherId != 0){
			this.studentGridServerMessage = "";
			this.showStudentGridServerMessage = false;
			this.showStudentWeekGradeGrid = true;
			this.getStudentWeekGrades();
		}
		else {
			this.showStudentWeekGradeGrid = false;
		}
	}

	getStudentWeekGrades(){
		this.isStudentWeekGradeGridLoading = true;
		this.showStudentWeekGradeGrid = false;
		this.studentGridServerMessage = "";
		this.showStudentGridServerMessage = false;
		this._teacherService.getStudentWeekGrades(this.teacherId, this.calendarWeekId)
            .subscribe(result => {
				this.isStudentWeekGradeGridLoading = false;
                this.StudentWeekGrades = result;
				
				if ( this.StudentWeekGrades == null ){
					this.showStudentGridServerMessage = true;
					this.showStudentWeekGradeGrid = false;
					this.studentGridServerMessage = "No Students assigned to selected teacher !";
				}
				else {
					this.showStudentGridServerMessage = false;
					this.showStudentWeekGradeGrid = true;
				}

            },
            err => {
				this.isStudentWeekGradeGridLoading = false;
				console.log("Error occurred : Code=" + err.status + ",Error="+err.statusText);
				this.StudentWeekGrades = null;
				this.studentGridServerMessage = "Error Occured while retrieving information : " + err.statusText;
				this.showStudentGridServerMessage = true;
				this.showStudentWeekGradeGrid = false;
            });
	}

	selectScore(weekGrade : StudentWeekGrade, type: string, value:number){
		switch (type){
			case 'homework':
				weekGrade.homework = value;
				break;
			case 'reading':
				weekGrade.reading = value;
				break;
			case 'writing':
				weekGrade.writing = value;
				break;
			case 'speaking':
				weekGrade.speaking = value;
				break;
			case 'behavior':
				weekGrade.behavior = value;
				break;
			case 'quiz':
				weekGrade.quiz = value;
				break;
		}
		
	}

	selectAttendance(weekGrade : StudentWeekGrade, value:string){
		if ( value == 'N')
		{
			weekGrade.homework = 0;
			weekGrade.reading = 0;
			weekGrade.writing = 0;
			weekGrade.speaking = 0;
			weekGrade.behavior = 0;
			weekGrade.quiz = 0;
			weekGrade.notes = null;
		}
	}

	cancelClick(){
		this.showStudentWeekGradeGrid = false;
		this.StudentWeekGrades = null;
		this.teacherId = 0;
	}

	saveClick(){
		console.log("Save clicked");
		console.log(this.StudentWeekGrades[0].attendance);
		console.log(this.StudentWeekGrades[0].homework);
		console.log(this.StudentWeekGrades[0].reading);
		console.log(this.StudentWeekGrades[0].writing);
		console.log(this.StudentWeekGrades[0].speaking);
		console.log(this.StudentWeekGrades[0].behavior);
		console.log(this.StudentWeekGrades[0].quiz);
		console.log(this.StudentWeekGrades[0].notes);
	}
 }
