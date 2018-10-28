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
var AttendanceComponent = /** @class */ (function () {
    function AttendanceComponent(_authService, _calendarService, _gradeService) {
        this._authService = _authService;
        this._calendarService = _calendarService;
        this._gradeService = _gradeService;
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
        this.getCalendarWeeks();
        this.getGrades();
    };
    AttendanceComponent.prototype.getGrades = function () {
        var _this = this;
        this._gradeService.getGrades()
            .subscribe(function (result) {
            _this.Grades = result;
        }, function (err) {
            console.log(err.error);
        });
    };
    AttendanceComponent.prototype.getCalendarWeeks = function () {
        var _this = this;
        this._calendarService.getCalendarWeeks()
            .subscribe(function (result) {
            _this.CalendarWeeks = result;
        }, function (err) {
            console.log(err.error);
        });
    };
    AttendanceComponent.prototype.onSelectCalendarWeek = function (value) {
        console.log(value);
        this.calendarWeekId = value;
    };
    AttendanceComponent.prototype.onSelectGrade = function (value) {
        console.log(value);
        this.ctsGrade = value;
    };
    AttendanceComponent = __decorate([
        Component({
            templateUrl: './attendance.html'
        }),
        __metadata("design:paramtypes", [AuthService,
            CalendarService,
            GradeService])
    ], AttendanceComponent);
    return AttendanceComponent;
}());
export { AttendanceComponent };
//# sourceMappingURL=Attendance.js.map