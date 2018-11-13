import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../services/AuthService';
import { Observable } from 'rxjs';
import { Term } from '../../model/Term';
import { LoggerService } from '../../services/LoggerService';
import { GradeService } from '../../services/GradeService';
import { Grade } from '../../model/Grade';
import { CalendarService } from '../../services/CalendarService';
import { CalendarWeek } from '../../model/CalendarWeek';
import { TeacherService } from '../../services/TeacherService';
import { Teacher } from '../../model/Teacher';
import { StudentTestScore } from '../../model/StudentTestScore';


@Component({
    templateUrl: './scores.html'
})
export class ScoresComponent implements OnInit {
    isLoggedOn: boolean;

    Terms: Array<Term> = new Array<Term>();
    selectedTermWeekId: number;
    selectedGrade: string;
	selectedTeacherId : number;
	CalendarWeeks: CalendarWeek[];
    Grades: Grade[];
	Teachers : Teacher[];

	isSelectTermLoading:boolean;
	termLoadError : string;
	isSelectGradeLoading: boolean;
	gradeLoadError: string;
	isSelectTeacherLoading : boolean;
	teacherLoadError :string;

	isStudentTestScoreGridLoading : boolean;
	testScoreGridErrorMessage : string;
	StudentTestScores : Array<StudentTestScore> = new Array<StudentTestScore>();
	

    constructor(private _authService: AuthService,
		private _calendarService: CalendarService,
        private _gradeService: GradeService,
		private _teacherService: TeacherService,
        private _loggerService: LoggerService) {

    }

    ngOnInit() {
        this.isLoggedOn = this._authService.getIsLoggedOn();
        if (this.isLoggedOn == false) {
            window.location.href = "/logon/login";
            return;
        }

		this.isSelectTermLoading = false;
		this.termLoadError = "";
		this.isSelectGradeLoading = false;
		this.gradeLoadError = "";
		this.isSelectTeacherLoading= false;
		this.teacherLoadError = "";

		this.selectedTermWeekId = 0;
		this.selectedGrade = "";
		this.selectedTeacherId = 0;

		this.isStudentTestScoreGridLoading = false;
		this.testScoreGridErrorMessage = "";

        this.populateTerms();
        this.populateGrades();

    }


    onSelectTerm(value: any) {
        this.selectedTermWeekId = value;
		this.selectedGrade = "0";
		this.selectedTeacherId = 0;
    }

    onSelectGrade(value: any) {
        this.selectedGrade = value;
		if ( this.selectedGrade != "0"){
			this.populateTeachers();
		}
    }

	onSelectTeacher(value:any){
		this.selectedTeacherId = value;

		if ( this.selectedTeacherId != 0){
			this.populateStudentScoresGrid();
		}
	}


    populateTerms() {
		this.isSelectTermLoading = true;
		this.termLoadError = "";
        this._calendarService.getCalendarTestWeeks()
            .subscribe(result => {
				this.isSelectTermLoading = false;
                this.CalendarWeeks = result;
            },
            err => {
				this.isSelectTermLoading = false;
                this._loggerService.log("Error occurred : Code=" + err.status + ",Error="+err.statusText);
				if ( err.status == "404")
				{
					// data not found
					this.CalendarWeeks = null;
				}
				this.termLoadError = "Error Occured";
            });
    }


    populateGrades() {
        this.isSelectGradeLoading = true;
        this.gradeLoadError = "";
        this._gradeService.getGrades()
            .subscribe(result => {
                this.isSelectGradeLoading = false;
                this.Grades = result;
            },
            err => {
                this.isSelectGradeLoading = false;
                this._loggerService.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
                if (err.status == "404") {
                    // data not found
                    this.Grades = null;
                }
                this.gradeLoadError = "Error Occured";
            });
    }

	populateTeachers(){
		this.isSelectTeacherLoading = true;
		this.teacherLoadError = "";
        this._teacherService.getTeachersByGrade(this.selectedGrade, this.selectedTermWeekId)
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
					this.teacherLoadError = "Error Occured";
				}
            });
	}

	populateStudentScoresGrid(){
		let score = new StudentTestScore();
		score.studentID = 1;
		score.firstName = "firstName 1";
		score.lastName = "lastname 1";
		score.testScore = 95;
		this.StudentTestScores.push(score);

		score = new StudentTestScore();
		score.studentID = 2;
		score.firstName = "firstName 2";
		score.lastName = "lastname 2";
		score.testScore = 95;
		this.StudentTestScores.push(score);

		score = new StudentTestScore();
		score.studentID = 3;
		score.firstName = "firstName 3";
		score.lastName = "lastname 3";
		score.testScore = 95;
		this.StudentTestScores.push(score);
	}

}
