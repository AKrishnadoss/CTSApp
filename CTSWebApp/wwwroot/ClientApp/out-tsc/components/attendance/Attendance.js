var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/AuthService';
import { CalendarService } from '../../services/CalendarService';
import { GradeService } from '../../services/GradeService';
import { Grade } from '../../model/Grade';
import { TeacherService } from '../../services/TeacherService';
import { StudentService } from '../../services/StudentService';
import { LoggerService } from '../../services/LoggerService';
var AttendanceComponent = /** @class */ (function () {
    function AttendanceComponent(_authService, _calendarService, _gradeService, _teacherService, _studentService, _loggerService, _router) {
        this._authService = _authService;
        this._calendarService = _calendarService;
        this._gradeService = _gradeService;
        this._teacherService = _teacherService;
        this._studentService = _studentService;
        this._loggerService = _loggerService;
        this._router = _router;
        this.pageTitle = "Attendance";
        this.userName = '';
    }
    AttendanceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoggedOn = this._authService.getIsLoggedOn();
        if (this.isLoggedOn == false) {
            this._loggerService.log("Not logged in");
            this._router.navigate(["loggedOut"]);
            return;
        }
        this._authService.hasAccess("Attendance")
            .then(function (x) {
            if (x == false) {
                _this._loggerService.log("Unauthorized access");
                _this._router.navigate(["accessDenied"]);
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
        this._authService.hasAccess("Attendance.GradeSelection").then(function (x) {
            _this.gradeSelectionAllowed = x;
            if (_this.gradeSelectionAllowed == true) {
                _this.getGrades();
            }
            else {
                _this.getGradeAndTeacherDetails();
            }
        });
        this._authService.hasAccess("Attendance.TeacherSelection").then(function (x) {
            _this.teacherSelectionAllowed = x;
        });
    };
    AttendanceComponent.prototype.getGrades = function () {
        var _this = this;
        console.log('Loading grades');
        this.isSelectGradeLoading = true;
        this.gradeLoadError = "";
        this._gradeService.getGrades()
            .subscribe(function (result) {
            _this.isSelectGradeLoading = false;
            _this.Grades = result;
        }, function (err) {
            _this.isSelectGradeLoading = false;
            _this._loggerService.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
            if (err.status == "404") {
                // data not found
                _this.Grades = null;
            }
            _this.gradeLoadError = "Error Occured";
        });
    };
    AttendanceComponent.prototype.getCalendarWeeks = function () {
        var _this = this;
        this.isSelectCalendarWeekLoading = true;
        this.calendarWeekLoadError = "";
        this._calendarService.getCalendarWeeks()
            .subscribe(function (result) {
            _this.isSelectCalendarWeekLoading = false;
            _this.CalendarWeeks = result;
        }, function (err) {
            _this.isSelectCalendarWeekLoading = false;
            _this._loggerService.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
            if (err.status == "404") {
                // data not found
                _this.CalendarWeeks = null;
            }
            _this.calendarWeekLoadError = "Error Occured";
        });
    };
    AttendanceComponent.prototype.getGradeAndTeacherDetails = function () {
        var _this = this;
        if (this.calendarWeekId != 0) {
            this._teacherService.getAssignedTeacherByWeek(this.calendarWeekId)
                .subscribe(function (result) {
                _this.isSelectTeacherLoading = false;
                _this.Teachers = result;
                //populate grade from result
                var gr = new Array();
                gr.push(new Grade(_this.Teachers[0].ctsGrade, _this.Teachers[0].ctsGrade, null));
                _this.Grades = gr;
                _this.selectedGrade = _this.Teachers[0].ctsGrade;
                _this.selectedGradeLevel = ""; // TODO: Get GradeLevel
                _this.selectGradeEnabled = false;
                if (_this.Teachers.length > 1) {
                    _this.selectedTeacherId = 0;
                }
                else {
                    _this.selectedTeacherId = _this.Teachers[0].id;
                    _this.selectTeachedEnabled = false;
                    _this.displayStudentWeekGradeGrid();
                }
            }, function (err) {
                _this.isSelectTeacherLoading = false;
                _this._loggerService.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
                if (err.status == "404") {
                    // data not found
                    _this.Teachers = null;
                }
            });
        }
    };
    AttendanceComponent.prototype.onSelectCalendarWeek = function (value) {
        this.calendarWeekId = value;
        if (this.gradeSelectionAllowed == true) {
            this.selectedGrade = "0";
            this.selectedTeacherId = 0;
            this.selectedGradeLevel = "";
        }
        else {
            this.getGradeAndTeacherDetails();
        }
        this.displayStudentWeekGradeGrid();
    };
    AttendanceComponent.prototype.onSelectGrade = function (value) {
        if (value != "0") {
            var selectedGrade = this.Grades.find(function (x) { return x.ctsGrade == value; });
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
    };
    AttendanceComponent.prototype.onSelectTeacher = function (value) {
        this.selectedTeacherId = value;
        //console.log("selected teacherId = " + value);
        this.displayStudentWeekGradeGrid();
    };
    AttendanceComponent.prototype.getTeachersByGrade = function (grade, weekId) {
        var _this = this;
        this.isSelectTeacherLoading = true;
        this._teacherService.getAssignedTeacherByGradeAndWeek(grade, weekId)
            .subscribe(function (result) {
            _this.isSelectTeacherLoading = false;
            _this.Teachers = result;
        }, function (err) {
            _this.isSelectTeacherLoading = false;
            _this._loggerService.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
            if (err.status == "404") {
                // data not found
                _this.Teachers = null;
            }
        });
    };
    AttendanceComponent.prototype.displayStudentWeekGradeGrid = function () {
        this.studentGridServerSuccessMessage = "";
        if (this.calendarWeekId != 0 && this.selectedTeacherId != 0) {
            this.studentGridServerErrorMessage = "";
            this.studentGridServerWarningMessage = "";
            if (this.selectedGradeLevel == "L1") {
                this.showL2Grid = false;
                this.showL3Grid = false;
                this.getL1WeekGrades();
            }
            else if (this.selectedGradeLevel == "L2") {
                this.showL1Grid = false;
                this.showL3Grid = false;
                this.getL2WeekGrades();
            }
            else if (this.selectedGradeLevel == "L3") {
                this.showL1Grid = false;
                this.showL2Grid = false;
                this.getL3WeekGrades();
            }
        }
        else {
            this.showL1Grid = false;
            this.showL2Grid = false;
            this.showL3Grid = false;
        }
    };
    AttendanceComponent.prototype.getL1WeekGrades = function () {
        var _this = this;
        this.isStudentWeekGradeGridLoading = true;
        this.showL1Grid = false;
        this.studentGridServerErrorMessage = "";
        this.studentGridServerWarningMessage = "";
        this._teacherService.getWeekGrades(this.selectedTeacherId, this.selectedGradeLevel, this.calendarWeekId)
            .subscribe(function (result) {
            _this.isStudentWeekGradeGridLoading = false;
            _this.StudentWeekGrades = result;
            if (_this.StudentWeekGrades == null) {
                _this.showL1Grid = false;
                _this.studentGridServerErrorMessage = "No Student(s) assigned to selected teacher.";
            }
            else {
                if (result.length > 0) {
                    if (result[0].dataFreeze == 'Y') {
                        _this.isL1GridReadOnly = true;
                    }
                    else {
                        _this.isL1GridReadOnly = false;
                    }
                    if (result[0].id == 0) {
                        _this.studentGridServerWarningMessage = "Note: Data not entered for this week, showing default entries";
                        console.log(_this.studentGridServerWarningMessage);
                    }
                }
                _this.showL1Grid = true;
            }
        }, function (err) {
            _this.isStudentWeekGradeGridLoading = false;
            console.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
            _this.StudentWeekGrades = null;
            _this.studentGridServerErrorMessage = "Error Occured while retrieving information : " + err.statusText;
            _this.showL2Grid = false;
        });
    };
    AttendanceComponent.prototype.getL2WeekGrades = function () {
        var _this = this;
        this.isStudentWeekGradeGridLoading = true;
        this.showL2Grid = false;
        this.studentGridServerErrorMessage = "";
        this.studentGridServerWarningMessage = "";
        this._teacherService.getWeekGrades(this.selectedTeacherId, this.selectedGradeLevel, this.calendarWeekId)
            .subscribe(function (result) {
            _this.isStudentWeekGradeGridLoading = false;
            _this.StudentWeekGrades = result;
            if (_this.StudentWeekGrades == null) {
                _this.showL2Grid = false;
                _this.studentGridServerErrorMessage = "No Student(s) assigned to selected teacher.";
            }
            else {
                if (result.length > 0) {
                    if (result[0].dataFreeze == 'Y') {
                        _this.isL2GridReadOnly = true;
                    }
                    else {
                        _this.isL2GridReadOnly = false;
                    }
                    if (result[0].id == 0) {
                        _this.studentGridServerWarningMessage = "Note: Data not entered for this week, showing default entries";
                        console.log(_this.studentGridServerWarningMessage);
                    }
                }
                _this.showL2Grid = true;
            }
        }, function (err) {
            _this.isStudentWeekGradeGridLoading = false;
            console.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
            _this.StudentWeekGrades = null;
            _this.studentGridServerErrorMessage = "Error Occured while retrieving information : " + err.statusText;
            _this.showL2Grid = false;
        });
    };
    AttendanceComponent.prototype.getL3WeekGrades = function () {
        var _this = this;
        this.isStudentWeekGradeGridLoading = true;
        this.showL3Grid = false;
        this.studentGridServerErrorMessage = "";
        this.studentGridServerWarningMessage = "";
        this._teacherService.getWeekGrades(this.selectedTeacherId, this.selectedGradeLevel, this.calendarWeekId)
            .subscribe(function (result) {
            _this.isStudentWeekGradeGridLoading = false;
            _this.StudentWeekGrades = result;
            if (_this.StudentWeekGrades == null) {
                _this.showL3Grid = false;
                _this.studentGridServerErrorMessage = "No Student(s) assigned to selected teacher.";
            }
            else {
                if (result.length > 0) {
                    if (result[0].dataFreeze == 'Y') {
                        _this.isL3GridReadOnly = true;
                    }
                    else {
                        _this.isL3GridReadOnly = false;
                    }
                    if (result[0].id == 0) {
                        _this.studentGridServerWarningMessage = "Note: Data not entered for this week, showing default entries";
                        console.log(_this.studentGridServerWarningMessage);
                    }
                }
                _this.showL3Grid = true;
            }
        }, function (err) {
            _this.isStudentWeekGradeGridLoading = false;
            console.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
            _this.StudentWeekGrades = null;
            _this.studentGridServerErrorMessage = "Error Occured while retrieving information : " + err.statusText;
            _this.showL3Grid = false;
        });
    };
    AttendanceComponent.prototype.selectScore = function (weekGrade, type, value) {
        switch (type) {
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
    };
    AttendanceComponent.prototype.selectAttendance = function (weekGrade, value) {
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
    };
    AttendanceComponent.prototype.cancelClick = function () {
        this.showL1Grid = false;
        this.showL2Grid = false;
        this.showL3Grid = false;
        this.studentGridServerSuccessMessage = "";
        this.studentGridServerErrorMessage = "";
        this.studentGridServerWarningMessage = "";
        this.StudentWeekGrades = null;
        this.selectedTeacherId = 0;
    };
    AttendanceComponent.prototype.saveClick = function () {
        var _this = this;
        this.isGridSaving = true;
        this.studentGridServerErrorMessage = "";
        this.studentGridServerSuccessMessage = "";
        this.studentGridServerWarningMessage = "";
        this._studentService.saveStudentWeekGrades(this.StudentWeekGrades)
            .subscribe(function (result) {
            _this.isGridSaving = false;
            _this.studentGridServerSuccessMessage = "Student Week Grades saved successfully !";
        }, function (err) {
            console.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
            _this.isGridSaving = false;
            _this.studentGridServerSuccessMessage = "";
            _this.studentGridServerErrorMessage = "Save failed. ";
        });
    };
    AttendanceComponent = __decorate([
        Component({
            templateUrl: './attendance.html'
        }),
        __metadata("design:paramtypes", [AuthService,
            CalendarService,
            GradeService,
            TeacherService,
            StudentService,
            LoggerService,
            Router])
    ], AttendanceComponent);
    return AttendanceComponent;
}());
export { AttendanceComponent };
//# sourceMappingURL=Attendance.js.map