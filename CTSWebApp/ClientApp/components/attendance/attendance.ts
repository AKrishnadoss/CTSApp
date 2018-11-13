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
import { StudentService } from '../../services/StudentService';
import {LoggerService} from '../../services/LoggerService';

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
	showStudentGridServerErrorMessage : boolean;
	studentGridServerErrorMessage : string;
	isStudentWeekGradeGridSaving : boolean;
	studentGridServerSuccessMessage : string;

	calendarWeekLoadError : string;
	gradeLoadError : string;

    // Search criteria
    calendarWeekId: number;
    ctsGrade: string;
    teacherId: number;

    constructor(private _authService: AuthService,
        private _calendarService: CalendarService,
        private _gradeService: GradeService,
		private _teacherService: TeacherService,
		private _studentService: StudentService,
		private _loggerService: LoggerService) {
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
		this.showStudentGridServerErrorMessage = false;
		this.isStudentWeekGradeGridSaving = false;
		this.studentGridServerSuccessMessage = "";

		this.calendarWeekId = 0;
		this.ctsGrade = "0";
		this.teacherId = 0;

		this.calendarWeekLoadError = "";
		this.gradeLoadError = "";

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
		this.gradeLoadError = "";
        this._gradeService.getGrades()
            .subscribe(result => {
				this.isSelectGradeLoading = false;
                this.Grades = result;
            },
            err => {
				this.isSelectGradeLoading = false;
                this._loggerService.log("Error occurred : Code=" + err.status + ",Error="+err.statusText);
				if ( err.status == "404")
				{
					// data not found
					this.Grades = null;
				}
				this.gradeLoadError = "Error Occured";
            });
    }

    getCalendarWeeks() {
		this.isSelectCalendarWeekLoading = true;
		this.calendarWeekLoadError = "";
        this._calendarService.getCalendarWeeks()
            .subscribe(result => {
				this.isSelectCalendarWeekLoading = false;
                this.CalendarWeeks = result;
            },
            err => {
				this.isSelectCalendarWeekLoading = false;
                this._loggerService.log("Error occurred : Code=" + err.status + ",Error="+err.statusText);
				if ( err.status == "404")
				{
					// data not found
					this.CalendarWeeks = null;
				}
				this.calendarWeekLoadError = "Error Occured";
            });
    }

    onSelectCalendarWeek(value : any) {
        this.calendarWeekId = value;
		//console.log("selected calendarWeekId = " + value);
		this.ctsGrade = "0";
		this.teacherId = 0;
		this.displayStudentWeekGradeGrid();
    }

    onSelectGrade(value: any) {
        //console.log("selected grade = " + value);
		this.studentGridServerErrorMessage = "";
		this.showStudentGridServerErrorMessage = false;
		this.Teachers = null;
		this.teacherId = 0;
        this.ctsGrade = value;
		
		if ( value != "0" && this.calendarWeekId != 0){
			this.getTeachersByGrade(this.ctsGrade, this.calendarWeekId);
		}
		this.displayStudentWeekGradeGrid();
    }

	onSelectTeacher(value:any){
		this.teacherId = value;
		//console.log("selected teacherId = " + value);
		this.displayStudentWeekGradeGrid();
	}

	getTeachersByGrade(grade : string, weekId : number) {
		this.isSelectTeacherLoading = true;
        this._teacherService.getTeachersByGrade(grade, weekId)
            .subscribe(result => {
				this.isSelectTeacherLoading = false;
                this.Teachers = result;
            },
            err => {
				this.isSelectTeacherLoading = false;
				this._loggerService.log("Error occurred : Code=" + err.status + ",Error="+err.statusText);
				if ( err.status == "404")
				{
					// data not found
					this.Teachers = null;
				}
            });
    }

	displayStudentWeekGradeGrid(){
		this.studentGridServerSuccessMessage = "";
		if ( this.calendarWeekId != 0 && this.teacherId != 0){
			this.studentGridServerErrorMessage = "";
			this.showStudentGridServerErrorMessage = false;
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
		this.studentGridServerErrorMessage = "";
		this.showStudentGridServerErrorMessage = false;
		this._teacherService.getStudentWeekGrades(this.teacherId, this.calendarWeekId)
            .subscribe(result => {
				this.isStudentWeekGradeGridLoading = false;
                this.StudentWeekGrades = result;
				
				if ( this.StudentWeekGrades == null ){
					this.showStudentGridServerErrorMessage = true;
					this.showStudentWeekGradeGrid = false;
					this.studentGridServerErrorMessage = "No Student(s) assigned to selected teacher.";
				}
				else {
					this.showStudentGridServerErrorMessage = false;
					this.showStudentWeekGradeGrid = true;
				}

            },
            err => {
				this.isStudentWeekGradeGridLoading = false;
				console.log("Error occurred : Code=" + err.status + ",Error="+err.statusText);
				this.StudentWeekGrades = null;
				this.studentGridServerErrorMessage = "Error Occured while retrieving information : " + err.statusText;
				this.showStudentGridServerErrorMessage = true;
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
		this.studentGridServerSuccessMessage = "";
		this.studentGridServerErrorMessage = "";
		this.StudentWeekGrades = null;
		this.teacherId = 0;
	}

	saveClick(){
		this.isStudentWeekGradeGridSaving = true;
		this.showStudentGridServerErrorMessage = false;
		this.studentGridServerErrorMessage = "";
		this.studentGridServerSuccessMessage = "";
		this._studentService.saveStudentWeekGrades(this.StudentWeekGrades)
			.subscribe(result=> {
				this.isStudentWeekGradeGridSaving = false;
				this.studentGridServerSuccessMessage = "Student Week Grades saved successfully !";
			},
			err=> {
				console.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
				this.isStudentWeekGradeGridSaving = false;
				this.showStudentGridServerErrorMessage = true;
				this.studentGridServerSuccessMessage = "";
				this.studentGridServerErrorMessage = "Save failed. " + err.statusText;
			});

	}
 }
