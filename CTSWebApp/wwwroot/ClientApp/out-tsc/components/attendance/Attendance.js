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
import { AuthService } from '../../services/AuthService';
import { CalendarService } from '../../services/CalendarService';
import { GradeService } from '../../services/GradeService';
import { TeacherService } from '../../services/TeacherService';
import { StudentService } from '../../services/StudentService';
import { LoggerService } from '../../services/LoggerService';
var AttendanceComponent = /** @class */ (function () {
    function AttendanceComponent(_authService, _calendarService, _gradeService, _teacherService, _studentService, _loggerService) {
        this._authService = _authService;
        this._calendarService = _calendarService;
        this._gradeService = _gradeService;
        this._teacherService = _teacherService;
        this._studentService = _studentService;
        this._loggerService = _loggerService;
        this.pageTitle = "Attendance";
        this.userName = '';
    }
    AttendanceComponent.prototype.ngOnInit = function () {
        this.isLoggedOn = this._authService.getIsLoggedOn();
        if (this.isLoggedOn == false) {
            window.location.href = "/logon/login";
            return;
        }
        this.userName = this._authService.getUserName();
        this.Scores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.isSelectCalendarWeekLoading = false;
        this.isSelectGradeLoading = false;
        this.isSelectTeacherLoading = false;
        this.isStudentWeekGradeGridLoading = false;
        this.showStudentWeekGradeGrid = false;
        this.showStudentGridServerErrorMessage = false;
        this.isStudentWeekGradeGridSaving = false;
        this.studentGridServerSuccessMessage = "";
        this.calendarWeekId = 0;
        this.ctsGrade = "";
        this.teacherId = 0;
        this.calendarWeekLoadError = "";
        this.gradeLoadError = "";
        this.getCalendarWeeks();
        this.getGrades();
    };
    AttendanceComponent.prototype.populateScores = function () {
        this.Scores.push(0);
        this.Scores.push(1);
        this.Scores.push(2);
        this.Scores.push(3);
    };
    AttendanceComponent.prototype.getGrades = function () {
        var _this = this;
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
    AttendanceComponent.prototype.onSelectCalendarWeek = function (value) {
        this.calendarWeekId = value;
        //console.log("selected calendarWeekId = " + value);
        this.displayStudentWeekGradeGrid();
    };
    AttendanceComponent.prototype.onSelectGrade = function (value) {
        //console.log("selected grade = " + value);
        this.studentGridServerErrorMessage = "";
        this.showStudentGridServerErrorMessage = false;
        this.Teachers = null;
        this.teacherId = 0;
        this.ctsGrade = value;
        if (value != "0") {
            this.getTeachersByGrade(this.ctsGrade);
        }
        this.displayStudentWeekGradeGrid();
    };
    AttendanceComponent.prototype.onSelectTeacher = function (value) {
        this.teacherId = value;
        //console.log("selected teacherId = " + value);
        this.displayStudentWeekGradeGrid();
    };
    AttendanceComponent.prototype.getTeachersByGrade = function (grade) {
        var _this = this;
        this.isSelectTeacherLoading = true;
        this._teacherService.getTeachersByGrade(grade)
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
        if (this.calendarWeekId != 0 && this.teacherId != 0) {
            this.studentGridServerErrorMessage = "";
            this.showStudentGridServerErrorMessage = false;
            this.showStudentWeekGradeGrid = true;
            this.getStudentWeekGrades();
        }
        else {
            this.showStudentWeekGradeGrid = false;
        }
    };
    AttendanceComponent.prototype.getStudentWeekGrades = function () {
        var _this = this;
        this.isStudentWeekGradeGridLoading = true;
        this.showStudentWeekGradeGrid = false;
        this.studentGridServerErrorMessage = "";
        this.showStudentGridServerErrorMessage = false;
        this._teacherService.getStudentWeekGrades(this.teacherId, this.calendarWeekId)
            .subscribe(function (result) {
            _this.isStudentWeekGradeGridLoading = false;
            _this.StudentWeekGrades = result;
            if (_this.StudentWeekGrades == null) {
                _this.showStudentGridServerErrorMessage = true;
                _this.showStudentWeekGradeGrid = false;
                _this.studentGridServerErrorMessage = "No Student(s) assigned to selected teacher.";
            }
            else {
                _this.showStudentGridServerErrorMessage = false;
                _this.showStudentWeekGradeGrid = true;
            }
        }, function (err) {
            _this.isStudentWeekGradeGridLoading = false;
            console.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
            _this.StudentWeekGrades = null;
            _this.studentGridServerErrorMessage = "Error Occured while retrieving information : " + err.statusText;
            _this.showStudentGridServerErrorMessage = true;
            _this.showStudentWeekGradeGrid = false;
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
        }
    };
    AttendanceComponent.prototype.selectAttendance = function (weekGrade, value) {
        if (value == 'N') {
            weekGrade.homework = 0;
            weekGrade.reading = 0;
            weekGrade.writing = 0;
            weekGrade.speaking = 0;
            weekGrade.behavior = 0;
            weekGrade.quiz = 0;
            weekGrade.notes = null;
        }
    };
    AttendanceComponent.prototype.cancelClick = function () {
        this.showStudentWeekGradeGrid = false;
        this.studentGridServerSuccessMessage = "";
        this.studentGridServerErrorMessage = "";
        this.StudentWeekGrades = null;
        this.teacherId = 0;
    };
    AttendanceComponent.prototype.saveClick = function () {
        var _this = this;
        this.isStudentWeekGradeGridSaving = true;
        this.showStudentGridServerErrorMessage = false;
        this.studentGridServerErrorMessage = "";
        this.studentGridServerSuccessMessage = "";
        this._studentService.saveStudentWeekGrades(this.StudentWeekGrades)
            .subscribe(function (result) {
            _this.isStudentWeekGradeGridSaving = false;
            _this.studentGridServerSuccessMessage = "Student Week Grades saved successfully !";
        }, function (err) {
            console.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
            _this.isStudentWeekGradeGridSaving = false;
            _this.showStudentGridServerErrorMessage = true;
            _this.studentGridServerSuccessMessage = "";
            _this.studentGridServerErrorMessage = "Save failed. " + err.statusText;
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
            LoggerService])
    ], AttendanceComponent);
    return AttendanceComponent;
}());
export { AttendanceComponent };
//# sourceMappingURL=Attendance.js.map