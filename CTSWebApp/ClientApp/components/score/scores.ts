﻿import { Component, OnInit } from '@angular/core'
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
import { StudentTermScore } from '../../model/StudentTermScore';
import { transformAll } from '@angular/compiler/src/render3/r3_ast';

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

    selectGradeEnabled: boolean;
    selectTeachedEnabled: boolean;

    isStudentTermScoreGridLoading : boolean;
	termScoreGridErrorMessage : string;
	//StudentTestScores : Array<StudentTestScore> = new Array<StudentTestScore>();
    StudentTermScores: StudentTermScore[];

    studentGridServerErrorMessage: string;
    studentGridServerSuccessMessage: string;
    isStudentTermScoreGridSaving: boolean;

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

        if (!this._authService.hasAccess("TermScores")) {
            // TODO: navigate to unauthorized page
            this._loggerService.log("Unauthorized access");
            window.location.href = "/error";
        }
        this._loggerService.log("Access is authorized");

		this.isSelectTermLoading = false;
		this.termLoadError = "";
		this.isSelectGradeLoading = false;
		this.gradeLoadError = "";
		this.isSelectTeacherLoading= false;
		this.teacherLoadError = "";

		this.selectedTermWeekId = 0;
		this.selectedGrade = "";
		this.selectedTeacherId = 0;

        this.isStudentTermScoreGridLoading = false;
		this.termScoreGridErrorMessage = "";

        this.selectGradeEnabled = true;
        this.selectTeachedEnabled = true;

        this.studentGridServerErrorMessage = "";
        this.studentGridServerSuccessMessage = "";
        this.isStudentTermScoreGridSaving = false;

        this.populateTerms();
        if (this._authService.hasAccess("TermScores.GradeSelection")) {
            this.populateGrades();
        }
        else {
            this.populateGradeAndTeacherDetails();
        }

    }


    onSelectTerm(value: any) {
        this.selectedTermWeekId = value;
        if (this._authService.hasAccess("TermScores.GradeSelection")) {
            this.selectedGrade = "0";
            this.selectedTeacherId = 0;
        }
        else {
            this.populateGradeAndTeacherDetails();
        }
        this.populateStudentTermScoresGrid();
    }

    onSelectGrade(value: any) {
        this.selectedGrade = value;
        if (this._authService.hasAccess("TermScores.TeacherSelection")) {
            if (this.selectedGrade != "0") {
                this.populateTeachers();
            }
        }
    }

	onSelectTeacher(value:any){
		this.selectedTeacherId = value;

		if ( this.selectedTeacherId != 0){
            this.populateStudentTermScoresGrid();
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
        this._teacherService.getAssignedTeacherByGradeAndWeek(this.selectedGrade, this.selectedTermWeekId)
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

    populateGradeAndTeacherDetails() {
        if (this.selectedTermWeekId != 0) {
            this._teacherService.getAssignedTeacherByWeek(this.selectedTermWeekId)
                .subscribe(result => {
                    this.isSelectTeacherLoading = false;
                    this.Teachers = result;

                    //populate grade from result
                    let gr: Array<Grade> = new Array<Grade>();
                    gr.push(new Grade(this.Teachers[0].ctsGrade, this.Teachers[0].ctsGrade));
                    this.Grades = gr;
                    this.selectedGrade = this.Teachers[0].ctsGrade;
                    this.selectGradeEnabled = false;

                    if (this.Teachers.length > 1) {
                        this.selectedTeacherId = 0;
                    } else {
                        this.selectedTeacherId = this.Teachers[0].id;
                        this.selectTeachedEnabled = false;
                        this.populateStudentTermScoresGrid();
                    }
                },
                    err => {
                        this.isSelectTeacherLoading = false;
                        this._loggerService.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
                        if (err.status == "404") {
                            // data not found
                            this.Teachers = null;
                        }
                    });
        }
    }

    populateStudentTermScoresGrid() {
        if (this.selectedTermWeekId != 0 && this.selectedGrade != "0" && this.selectedTeacherId != 0) {
            this.isStudentTermScoreGridLoading = true;
            this.termScoreGridErrorMessage = "";
            this._teacherService.getStudentTermScores(this.selectedTeacherId, this.selectedTermWeekId)
                .subscribe(result => {
                    this.StudentTermScores = result;
                    this.isStudentTermScoreGridLoading = false;
                },
                err => {
                    this.isStudentTermScoreGridLoading = false;
                    this._loggerService.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
                    if (err.status == "404") {
                        // data not found
                        this.StudentTermScores = null;
                    }
                    this.termScoreGridErrorMessage = "Error Occured while retrieving information : " + err.statusText;
                });
        }
        
	}

}
