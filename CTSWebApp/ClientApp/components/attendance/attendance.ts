import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
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
import { reserveSlots } from '@angular/core/src/render3/instructions';
import { fail } from 'assert';
import { transformAll } from '@angular/compiler/src/render3/r3_ast';

@Component ({
	templateUrl : './attendance.html'
})
export class AttendanceComponent  implements OnInit {

	pageTitle = "Attendance";
	userName = '';
    isLoggedOn: boolean;
    isTermScoreEntryAllowed: boolean;
    CalendarWeeks: CalendarWeek[];
    Grades: Grade[];
	Teachers : Teacher[];
	StudentWeekGrades : StudentWeekGrade[];
	Scores : number[];

	isSelectCalendarWeekLoading:boolean;
	isSelectGradeLoading : boolean;
	isSelectTeacherLoading : boolean;
	isStudentWeekGradeGridLoading :boolean;
	

    studentGridServerErrorMessage: string;
    studentGridServerSuccessMessage: string;
    studentGridServerWarningMessage: string;
    isGridSaving: boolean;

    showL1Grid: boolean;
    isL1GridReadOnly: boolean;

    showL2Grid: boolean;
    isL2GridReadOnly: boolean;

    showL3Grid: boolean;
    isL3GridReadOnly: boolean;


	calendarWeekLoadError : string;
    gradeLoadError: string;

    selectGradeEnabled: boolean;
    selectTeachedEnabled: boolean;
    

    // Search criteria
    calendarWeekId: number;
    selectedCalendarWeek: any;
    selectedGrade: string;
    selectedGradeLevel: string;
    selectedTeacherId: number;

    gradeSelectionAllowed: boolean;
    teacherSelectionAllowed: boolean;

    showCopyFromPrevWeek: boolean;

    isPrevWeekEnabled: boolean;
    isNextWeekEnabled: boolean;
    isNavMode: boolean;

    constructor(private _authService: AuthService,
        private _calendarService: CalendarService,
        private _gradeService: GradeService,
		private _teacherService: TeacherService,
		private _studentService: StudentService,
        private _loggerService: LoggerService,
        private _router: Router) {
	}

    ngOnInit() {
        this.isLoggedOn = this._authService.getIsLoggedOn();
        this.isTermScoreEntryAllowed = false;
        if (this.isLoggedOn == false) {
            this._loggerService.log("Not logged in");
            this._router.navigate(["loggedOut"]);
            return;
        }

        this._authService.hasAccess("Attendance")
            .then((x) => {
                if (x == false) {
                    this._loggerService.log("Unauthorized access");
                    this._router.navigate(["accessDenied"]);
                }
            }); 

        

        this.userName = this._authService.getUserName();

        this.Scores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        this.isSelectCalendarWeekLoading = false;
        this.isSelectGradeLoading = false;
        this.isSelectTeacherLoading = false;
        this.isStudentWeekGradeGridLoading = false;
        this.showL1Grid = false;
        this.showL2Grid = false;
        this.showL3Grid = false;

        this.isGridSaving = false;
        this.studentGridServerSuccessMessage = "";

        this.calendarWeekId = 0;
        this.selectedGrade = "0";
        this.selectedGradeLevel = "";
        this.selectedTeacherId = 0;

        this.calendarWeekLoadError = "";
        this.gradeLoadError = "";

        this.selectGradeEnabled = true;
        this.selectTeachedEnabled = true;

        this.getCalendarWeeks();

        this.gradeSelectionAllowed = false;
        this.teacherSelectionAllowed = false;
        this.showCopyFromPrevWeek = false;
        this._authService.hasAccess("Attendance.GradeSelection").then((x) => {
            this.gradeSelectionAllowed = x;
            if (this.gradeSelectionAllowed == true) {
                this.getGrades();
            }
            else {
                this.getGradeAndTeacherDetails();
            }
        });

        this._authService.hasAccess("Attendance.TeacherSelection").then((x) => {
            this.teacherSelectionAllowed = x;
        });

        this._authService.hasAccess("TermScores")
            .then((x) => {
                this.isTermScoreEntryAllowed = x;
            });

        this.isPrevWeekEnabled = true;
        this.isNextWeekEnabled = true;
        this.isNavMode = false;
        this.selectedCalendarWeek = "0";
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
                this._loggerService.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
                this.Grades = null;
                this.gradeLoadError = "Error Occured : " + err.status + ":" + err.statusText;
                if (err.status == "401" || err.status == "403") {
                    this.studentGridServerErrorMessage = "UnAuthorized/Forbidden access or Session Expired. Please log out and login back to access the system."
                }
                else {
                    this.studentGridServerErrorMessage = "Error Occured while retrieving information : " + err.status + ". Please try later or contact system administrator";
                }
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
                this.CalendarWeeks = null;
                this._loggerService.log("Error occurred : Code=" + err.status + ",Error="+err.statusText);
                this.calendarWeekLoadError = "Error Occured : " + err.status + ":" + err.statusText;
                if (err.status == "401" || err.status == "403") {
                    this.studentGridServerErrorMessage = "UnAuthorized/Forbidden access or Session Expired. Please log out and login back to access the system."
                }
                else {
                    this.studentGridServerErrorMessage = "Error Occured while retrieving information : " + err.status + ". Please try later or contact system administrator";
                }
            });
    }

    getGradeAndTeacherDetails() {
        if (this.calendarWeekId != 0) {
            this._teacherService.getAssignedTeacherByWeek(this.calendarWeekId)
                .subscribe(result => {
                    this.isSelectTeacherLoading = false;
                    this.Teachers = result;

                    //populate grade from result
                    let gr: Array<Grade> = new Array<Grade>();
                    gr.push(new Grade(this.Teachers[0].ctsGrade, this.Teachers[0].ctsGrade, this.Teachers[0].gradeLevel));
                    this.Grades = gr;
                    this.selectedGrade = this.Teachers[0].ctsGrade;
                    this.selectedGradeLevel = this.Teachers[0].gradeLevel;
                    this.selectGradeEnabled = false;

                    if (this.Teachers.length > 1) {
                        this.selectedTeacherId = 0;
                    } else {
                        this.selectedTeacherId = this.Teachers[0].id;
                        this.selectTeachedEnabled = false;
                        this.displayStudentWeekGradeGrid();
                    }
                },
                err => {
                    this.isSelectTeacherLoading = false;
                    this._loggerService.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
                    this.Teachers = null;
                    if (err.status == "401" || err.status == "403") {
                        this.studentGridServerErrorMessage = "UnAuthorized/Forbidden access or Session Expired. Please log out and login back to access the system."
                    }
                    else {
                        this.studentGridServerErrorMessage = "Error Occured while retrieving information : " + err.status + ". Please try later or contact system administrator";
                    }
                });
        }
    }

    onSelectCalendarWeek(value : any) {
        this.calendarWeekId = value;
        this.studentGridServerErrorMessage = "";
        this.studentGridServerWarningMessage = "";
        this.studentGridServerSuccessMessage = "";
        this.showCopyFromPrevWeek = false;
        if (this.isNavMode == false) {
            // if not in NavMode do additional logic
            if (this.gradeSelectionAllowed == true) {
                this.selectedGrade = "0";
                this.selectedTeacherId = 0;
                this.selectedGradeLevel = "";
                this.Teachers = null;
            }
            else {
                this.getGradeAndTeacherDetails();
            }
        }

        this.displayStudentWeekGradeGrid();
    }

    onSelectGrade(value: any) {
        this.studentGridServerErrorMessage = "";
        this.studentGridServerWarningMessage = "";
        this.studentGridServerSuccessMessage = "";
        this.showCopyFromPrevWeek = false;
        if (value != "0") {
            var selectedGrade = this.Grades.find(x => x.ctsGrade == value);
            this.selectedGradeLevel = selectedGrade.gradeLevel;
        }

        if (this.teacherSelectionAllowed == true) {
            this.studentGridServerErrorMessage = "";
            this.studentGridServerWarningMessage = "";
            this.Teachers = null;
            this.selectedTeacherId = 0;
            this.selectedGrade = value;

            if (value != "0" && this.calendarWeekId != 0) {
                this.getTeachersByGrade(this.selectedGrade, this.calendarWeekId);
            }
            this.displayStudentWeekGradeGrid();
        }
    }

	onSelectTeacher(value:any){
        this.selectedTeacherId = value;
        this.studentGridServerErrorMessage = "";
        this.studentGridServerWarningMessage = "";
        this.studentGridServerSuccessMessage = "";
        this.showCopyFromPrevWeek = false;
		this.displayStudentWeekGradeGrid();
	}

	getTeachersByGrade(grade : string, weekId : number) {
		this.isSelectTeacherLoading = true;
        this._teacherService.getAssignedTeacherByGradeAndWeek(grade, weekId)
            .subscribe(result => {
				this.isSelectTeacherLoading = false;
                this.Teachers = result;
            },
            err => {
                this.isSelectTeacherLoading = false;
                this.Teachers = null;
				this._loggerService.log("Error occurred : Code=" + err.status + ",Error="+err.statusText);
                if (err.status == "401" || err.status == "403") {
                    this.studentGridServerErrorMessage = "UnAuthorized/Forbidden access or Session Expired. Please log out and login back to access the system."
                }
                else {
                    this.studentGridServerErrorMessage = "Error Occured while retrieving information : " + err.status + ". Please try later or contact system administrator.";
                }
            });
    }

	displayStudentWeekGradeGrid(){
		this.studentGridServerSuccessMessage = "";
        if (this.calendarWeekId != 0 && this.selectedTeacherId != 0){
			this.studentGridServerErrorMessage = "";
            this.studentGridServerWarningMessage = "";
            if (this.selectedGradeLevel == "L1") {
                this.showL2Grid = false;
                this.showL3Grid = false;
                this.getL1WeekGrades(this.calendarWeekId, true);
            }
            else if (this.selectedGradeLevel == "L2") {
                this.showL1Grid = false;
                this.showL3Grid = false;
                this.getL2WeekGrades(this.calendarWeekId, true);
            }
            else if (this.selectedGradeLevel == "L3") {
                this.showL1Grid = false;
                this.showL2Grid = false;
                this.getL3WeekGrades(this.calendarWeekId, true);
            }
		}
		else {
            this.showL1Grid = false;
            this.showL2Grid = false;
            this.showL3Grid = false;
		}
	}

    getL1WeekGrades(calendarWeekId : number, copyFromPrevWeekFlag : boolean) {
        this.showCopyFromPrevWeek = false;
        this.isStudentWeekGradeGridLoading = true;
        this.showL1Grid = false;
        this.studentGridServerErrorMessage = "";

        this.studentGridServerWarningMessage = "";
        this._teacherService.getWeekGrades(this.selectedTeacherId, this.selectedGradeLevel, calendarWeekId)
            .subscribe(result => {
                this.isStudentWeekGradeGridLoading = false;
                this.StudentWeekGrades = result;
                if (this.StudentWeekGrades == null) {

                    this.showL1Grid = false;
                    this.studentGridServerErrorMessage = "No Student(s) assigned to selected teacher.";
                }
                else {
                    if (result.length > 0) {
                        if (result[0].dataFreeze == 'Y') {
                            this.isL1GridReadOnly = true;
                        }
                        else {
                            this.isL1GridReadOnly = false;
                        }

                        
                        if (result[0].id == 0) {
                            this.studentGridServerWarningMessage = "Note: Data not entered for the selected week " + calendarWeekId + ", showing default entries.";
                            this.showCopyFromPrevWeek = copyFromPrevWeekFlag;
                        }

                        if (copyFromPrevWeekFlag == false) {
                            // If copying from prev week, then set all ids to 0, calendarweek to currently selected calendarweek, so the records will be created for selected week
                            result.forEach(x => {
                                x.id = 0;
                                x.calendarWeekID = this.calendarWeekId;
                            });

                            this.studentGridServerWarningMessage = "Note: Data copied from week " + calendarWeekId + ", make appropriate changes and click save.";
                        }

                    }

                    this.showL1Grid = true;
                }

            },
            err => {
                this.isStudentWeekGradeGridLoading = false;
                this.showL1Grid = false;
                this.StudentWeekGrades = null;
                this._loggerService.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
                if (err.status == "401" || err.status == "403") {
                    this.studentGridServerErrorMessage = "UnAuthorized/Forbidden access or Session Expired. Please log out and login back to access the system."
                }
                else {
                    this.studentGridServerErrorMessage = "Error Occured while retrieving information : " + err.status + ". Please try later or contact system administrator.";
                }
                });
    }

    getL2WeekGrades(calendarWeekId: number, copyFromPrevWeekFlag: boolean) {
        this.showCopyFromPrevWeek = false;
        this.isStudentWeekGradeGridLoading = true;
        this.showL2Grid = false;
        this.studentGridServerErrorMessage = "";

        this.studentGridServerWarningMessage = "";
        this._teacherService.getWeekGrades(this.selectedTeacherId, this.selectedGradeLevel, calendarWeekId)
            .subscribe(result => {
                this.isStudentWeekGradeGridLoading = false;
                this.StudentWeekGrades = result;
                if (this.StudentWeekGrades == null) {

                    this.showL2Grid = false;
                    this.studentGridServerErrorMessage = "No Student(s) assigned to selected teacher.";
                }
                else {
                    if (result.length > 0) {
                        if (result[0].dataFreeze == 'Y') {
                            this.isL2GridReadOnly = true;
                        }
                        else {
                            this.isL2GridReadOnly = false;
                        }

                        
                        if (result[0].id == 0) {
                            this.studentGridServerWarningMessage = "Note: Data not entered for the selected week " + calendarWeekId + ", showing default entries.";
                            this.showCopyFromPrevWeek = copyFromPrevWeekFlag;
                        }

                        if (copyFromPrevWeekFlag == false) {
                            // If copying from prev week, then set all ids to 0, calendarweek to currently selected calendarweek, so the records will be created for selected week
                            result.forEach(x => {
                                x.id = 0;
                                x.calendarWeekID = this.calendarWeekId;
                            });

                            this.studentGridServerWarningMessage = "Note: Data copied from week " + calendarWeekId + ", make appropriate changes and click save.";
                        }
                    }

                    this.showL2Grid = true;
                }

            },
                err => {
                    this.isStudentWeekGradeGridLoading = false;
                    this.showL2Grid = false;
                    this.StudentWeekGrades = null;
                    this._loggerService.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
                    if (err.status == "401" || err.status == "403") {
                        this.studentGridServerErrorMessage = "UnAuthorized/Forbidden access or Session Expired. Please log out and login back to access the system."
                    }
                    else {
                        this.studentGridServerErrorMessage = "Error Occured while retrieving information : " + err.status + ". Please try later or contact system administrator.";
                    }
                });
    }


    getL3WeekGrades(calendarWeekId: number, copyFromPrevWeekFlag: boolean) {
        this.showCopyFromPrevWeek = false;
		this.isStudentWeekGradeGridLoading = true;
        this.showL3Grid = false;
		this.studentGridServerErrorMessage = "";

        this.studentGridServerWarningMessage = "";
        this._teacherService.getWeekGrades(this.selectedTeacherId, this.selectedGradeLevel, calendarWeekId)
            .subscribe(result => {
                this.isStudentWeekGradeGridLoading = false;
                this.StudentWeekGrades = result;
				if ( this.StudentWeekGrades == null ){

                    this.showL3Grid = false;
					this.studentGridServerErrorMessage = "No Student(s) assigned to selected teacher.";
				}
                else {
                    if (result.length > 0) {
                        if (result[0].dataFreeze == 'Y') {
                            this.isL3GridReadOnly = true;
                        }
                        else {
                            this.isL3GridReadOnly = false;
                        }
                        //if (result[0].id == 0) {
                        //    this.studentGridServerWarningMessage = "Note: Data not entered for this week, showing default entries";
                        //    this.showCopyFromPrevWeek = true;
                        //}

                        
                        if (result[0].id == 0) {
                            this.studentGridServerWarningMessage = "Note: Data not entered for the selected week " + calendarWeekId + ", showing default entries.";
                            this.showCopyFromPrevWeek = copyFromPrevWeekFlag;
                        }

                        if (copyFromPrevWeekFlag == false) {
                            // If copying from prev week, then set all ids to 0, calendarweek to currently selected calendarweek, so the records will be created for selected week
                            result.forEach(x => {
                                x.id = 0;
                                x.calendarWeekID = this.calendarWeekId;
                            });

                            this.studentGridServerWarningMessage = "Note: Data copied from week " + calendarWeekId + ", make appropriate changes and click save.";
                        }
                    }

                    this.showL3Grid = true;
				}

            },
            err => {
                this.isStudentWeekGradeGridLoading = false;
                this.showL3Grid = false;
                this.StudentWeekGrades = null;
                this._loggerService.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
                if (err.status == "401" || err.status == "403") {
                    this.studentGridServerErrorMessage = "UnAuthorized/Forbidden access or Session Expired. Please log out and login back to access the system."
                }
                else {
                    this.studentGridServerErrorMessage = "Error Occured while retrieving information : " + err.status + ". Please try later or contact system administrator.";
                }
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
            case 'participation':
                weekGrade.participation = value;
                break;
		}
		
	}

	selectAttendance(weekGrade : StudentWeekGrade, value:string){
        if (value == '0') {
            weekGrade.homework = 0;
            weekGrade.reading = 0;
            weekGrade.writing = 0;
            weekGrade.speaking = 0;
            weekGrade.behavior = 0;
            weekGrade.quiz = 0;
            weekGrade.participation = 0;
            weekGrade.notes = null;
        }
        else if (value == '10') {
            weekGrade.homework = 10;
            weekGrade.reading = 10;
            weekGrade.writing = 10;
            weekGrade.speaking = 10;
            weekGrade.behavior = 10;
            weekGrade.quiz = 10;
            weekGrade.participation = 10;
            weekGrade.notes = null;
        }
	}

	closeClick(){
        this.showL1Grid = false;
        this.showL2Grid = false;
        this.showL3Grid = false;

		this.studentGridServerSuccessMessage = "";
        this.studentGridServerErrorMessage = "";
        this.studentGridServerWarningMessage = "";
        this.StudentWeekGrades = null;
        this.calendarWeekId = 0;
        this.selectedGrade = "0";
        this.selectedTeacherId = 0;
        this.showCopyFromPrevWeek = false;

        this.isNavMode = false;
        this.selectGradeEnabled = true;
        this.selectTeachedEnabled = true;
        this.selectedCalendarWeek = "0";
        this.Teachers = null;
	}

	saveClick(){
        this.isGridSaving = true;
        this.showCopyFromPrevWeek = false;

		this.studentGridServerErrorMessage = "";
        this.studentGridServerSuccessMessage = "";
        this.studentGridServerWarningMessage = "";
        this._studentService.saveStudentWeekGrades(this.selectedGradeLevel, this.StudentWeekGrades)
			.subscribe(result=> {
                this.isGridSaving = false;
				this.studentGridServerSuccessMessage = "Student Week Grades saved successfully !";
			},
			err=> {
                this.isGridSaving = false;
				this.studentGridServerSuccessMessage = "";
                this._loggerService.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
                if (err.status == "401" || err.status == "403") {
                    this.studentGridServerErrorMessage = "UnAuthorized/Forbidden access or Session Expired. Please log out and login back to access the system."
                }
                else {
                    this.studentGridServerErrorMessage = "Error Occured while retrieving information : " + err.status + ". Please try later or contact system administrator.";
                }

			});

    }


    copyFromPrevWeek() {
        this.showCopyFromPrevWeek = false;
        this.studentGridServerSuccessMessage = "";
        if (this.calendarWeekId != 0 && this.selectedTeacherId != 0) {
            this.studentGridServerErrorMessage = "";
            this.studentGridServerWarningMessage = "";

            let idx = this.CalendarWeeks.findIndex(x => x.id == this.calendarWeekId);
            let prevWeekIdx = idx;
            if (idx < (this.CalendarWeeks.length - 1)) {
                idx++;
            }
            let prevCalendarWeek = this.CalendarWeeks[idx];
            let prevCalendarWeekId = prevCalendarWeek.id;

            if (this.selectedGradeLevel == "L1") {
                this.showL2Grid = false;
                this.showL3Grid = false;
                this.getL1WeekGrades(prevCalendarWeekId, false);
            }
            else if (this.selectedGradeLevel == "L2") {
                this.showL1Grid = false;
                this.showL3Grid = false;
                this.getL2WeekGrades(prevCalendarWeekId, false);
            }
            else if (this.selectedGradeLevel == "L3") {
                this.showL1Grid = false;
                this.showL2Grid = false;
                this.getL3WeekGrades(prevCalendarWeekId, false);
            }
        }
        else {
            this.showL1Grid = false;
            this.showL2Grid = false;
            this.showL3Grid = false;
        }
    }

    prevWeekClick() {
        this.isNavMode = true;
        //this.selectGradeEnabled = false;
        //this.selectTeachedEnabled = false;

        let idx = this.CalendarWeeks.findIndex(x => x.id == this.calendarWeekId);
        let prevWeekIdx = idx;
        if (idx < (this.CalendarWeeks.length - 1)) {
            idx++;
            this.isNextWeekEnabled = true;
        }
        let prevCalendarWeek = this.CalendarWeeks[idx];
        let prevCalendarWeekId = prevCalendarWeek.id;
        this.calendarWeekId = prevCalendarWeekId;

        this.selectedCalendarWeek = prevCalendarWeek.id;//.description;
        if (idx == this.CalendarWeeks.length) {
            this.isPrevWeekEnabled = false;
        }

        this.displayStudentWeekGradeGrid();
    }

    nextWeekClick() {
        this.isNavMode = true;
        //this.selectGradeEnabled = false;
        //this.selectTeachedEnabled = false;

        let idx = this.CalendarWeeks.findIndex(x => x.id == this.calendarWeekId);
        let nextWeekIdx = idx;
        if (idx > 0) {
            idx--;
            this.isPrevWeekEnabled = true;
        }
        let nextCalendarWeek = this.CalendarWeeks[idx];
        let nextCalendarWeekId = nextCalendarWeek.id;
        this.calendarWeekId = nextCalendarWeekId;


        this.selectedCalendarWeek = nextCalendarWeek.id;
        if (idx == 0) {
            this.isNextWeekEnabled = false;
        }

        this.displayStudentWeekGradeGrid();
    }

    //copyFromPrevWeekForL1() {
        
    //    this.isStudentWeekGradeGridLoading = true;
    //    this.showL1Grid = false;
    //    this.studentGridServerErrorMessage = "";

    //    this.studentGridServerWarningMessage = "";
    //    // get prev calendar week 
    //    let idx = this.CalendarWeeks.findIndex(x => x.id == this.calendarWeekId);
    //    if (idx < (this.CalendarWeeks.length - 1)) {
    //        idx++;
    //    }
    //    let prevCalendarWeek = this.CalendarWeeks[idx];
    //    let prevCalendarWeekId = prevCalendarWeek.id;

    //    this._teacherService.getWeekGrades(this.selectedTeacherId, this.selectedGradeLevel, prevCalendarWeekId)
    //        .subscribe(result => {
    //            this.isStudentWeekGradeGridLoading = false;
    //            this.StudentWeekGrades = result;
    //            if (this.StudentWeekGrades == null) {

    //                this.showL1Grid = false;
    //                this.studentGridServerErrorMessage = "No Student(s) assigned to selected teacher.";
    //            }
    //            else {
    //                if (result.length > 0) {
    //                    if (result[0].dataFreeze == 'Y') {
    //                        this.isL1GridReadOnly = true;
    //                    }
    //                    else {
    //                        this.isL1GridReadOnly = false;
    //                    }
    //                    if (result[0].id == 0) {
    //                        this.studentGridServerWarningMessage = "Note: Data not entered for this week " + prevCalendarWeek + ", showing default entries";
    //                        this.showCopyFromPrevWeek = false;
    //                    }
    //                }

    //                this.showL1Grid = true;
    //            }

    //        },
    //            err => {
    //                this.isStudentWeekGradeGridLoading = false;
    //                this.showL1Grid = false;
    //                this.StudentWeekGrades = null;
    //                this._loggerService.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
    //                if (err.status == "401" || err.status == "403") {
    //                    this.studentGridServerErrorMessage = "UnAuthorized/Forbidden access or Session Expired. Please log out and login back to access the system."
    //                }
    //                else {
    //                    this.studentGridServerErrorMessage = "Error Occured while retrieving information : " + err.status + ". Please try later or contact system administrator.";
    //                }
    //            });
    //}

    showSaveButton(): boolean {
        let show: boolean = false;
        switch (this.selectedGradeLevel) {
            case "L1":
                show = !this.isL1GridReadOnly;
                break;
            case "L2":
                show = !this.isL2GridReadOnly;
                break;
            case "L3":
                show = !this.isL3GridReadOnly;
                break;
        }

        return show;
    }
 }
