(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!*****************************************************************!*\
  !*** ../clientapp/$$_lazy_route_resource lazy namespace object ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./app/app.component.html":
/*!*******************************************!*\
  !*** ../clientapp/app/app.component.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ "./app/app.component.ts":
/*!*****************************************!*\
  !*** ../clientapp/app/app.component.ts ***!
  \*****************************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_AuthService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/AuthService */ "./services/AuthService.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = /** @class */ (function () {
    function AppComponent(_authService) {
        this._authService = _authService;
        this.pageTitle = 'Home Page';
    }
    AppComponent.prototype.ngOnInit = function () {
        var tokenElement = document.getElementById("hdnToken");
        if (tokenElement != null) {
            this.token = tokenElement.innerText;
        }
        var emailElement = document.getElementById("hdnEmail");
        if (emailElement != null) {
            this.email = emailElement.innerText;
        }
        var userNameElement = document.getElementById("hdnUserName");
        if (userNameElement != null) {
            this.userName = userNameElement.innerText;
        }
        var loginLinkElement = document.getElementById("loginLink");
        var logoutLinkElement = document.getElementById("logoutLink");
        var loggedinElement = document.getElementById("loggedInAs");
        if (this.token == null) {
            console.log('token is null, getting from localStorage');
            this.token = localStorage.getItem('token');
            this.userName = localStorage.getItem('userName');
            this.email = localStorage.getItem('email');
            if (this.token != null) {
                console.log('localStorage is NOT null');
                if (loggedinElement != null) {
                    loggedinElement.innerText = this.email;
                }
                if (loginLinkElement != null) {
                    loginLinkElement.style.display = "none";
                }
                if (logoutLinkElement != null) {
                    logoutLinkElement.style.display = "block";
                }
                this.isLogonSuccessful = true;
                this._authService.setAuthToken(this.token);
                this._authService.setEmail(this.email);
                this._authService.setUserName(this.userName);
                this._authService.setIsLoggedOn(true);
            }
            else {
                console.log('localStorage is null');
                this.isLogonSuccessful = false;
                this._authService.setAuthToken('');
                this._authService.setEmail('');
                this._authService.setUserName('');
                this._authService.setIsLoggedOn(false);
            }
        }
        else {
            console.log('token is NOT null, setting into localStorage');
            localStorage.setItem('token', this.token);
            localStorage.setItem('userName', this.userName);
            localStorage.setItem('email', this.email);
            if (loggedinElement != null) {
                loggedinElement.innerText = this.email;
            }
            if (loginLinkElement != null) {
                loginLinkElement.style.display = "none";
            }
            if (logoutLinkElement != null) {
                logoutLinkElement.style.display = "block";
            }
            this.isLogonSuccessful = true;
            this._authService.setAuthToken(this.token);
            this._authService.setEmail(this.email);
            this._authService.setUserName(this.userName);
            this._authService.setIsLoggedOn(true);
        }
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ctsApp',
            template: __webpack_require__(/*! ./app.component.html */ "./app/app.component.html")
        }),
        __metadata("design:paramtypes", [_services_AuthService__WEBPACK_IMPORTED_MODULE_1__["AuthService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./app/app.module.ts":
/*!**************************************!*\
  !*** ../clientapp/app/app.module.ts ***!
  \**************************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "../node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "../node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "../node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "../node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_LoggerService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/LoggerService */ "./services/LoggerService.ts");
/* harmony import */ var _services_AuthService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/AuthService */ "./services/AuthService.ts");
/* harmony import */ var _services_CalendarService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/CalendarService */ "./services/CalendarService.ts");
/* harmony import */ var _services_GradeService__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/GradeService */ "./services/GradeService.ts");
/* harmony import */ var _services_TeacherService__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../services/TeacherService */ "./services/TeacherService.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./app.component */ "./app/app.component.ts");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../routes */ "./routes.ts");
/* harmony import */ var _components_home_Home__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../components/home/Home */ "./components/home/Home.ts");
/* harmony import */ var _components_contact_Contact__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../components/contact/Contact */ "./components/contact/Contact.ts");
/* harmony import */ var _components_attendance_Attendance__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../components/attendance/Attendance */ "./components/attendance/Attendance.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_10__["AppComponent"],
                _components_home_Home__WEBPACK_IMPORTED_MODULE_12__["HomeComponent"],
                _components_attendance_Attendance__WEBPACK_IMPORTED_MODULE_14__["AttendanceComponent"],
                _components_contact_Contact__WEBPACK_IMPORTED_MODULE_13__["ContactComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_2__["HttpModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                _routes__WEBPACK_IMPORTED_MODULE_11__["AppRoutingModule"]
            ],
            providers: [_services_AuthService__WEBPACK_IMPORTED_MODULE_6__["AuthService"], _services_LoggerService__WEBPACK_IMPORTED_MODULE_5__["LoggerService"], _services_CalendarService__WEBPACK_IMPORTED_MODULE_7__["CalendarService"], _services_GradeService__WEBPACK_IMPORTED_MODULE_8__["GradeService"], _services_TeacherService__WEBPACK_IMPORTED_MODULE_9__["TeacherService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_10__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./components/attendance/Attendance.ts":
/*!********************************************************!*\
  !*** ../clientapp/components/attendance/Attendance.ts ***!
  \********************************************************/
/*! exports provided: AttendanceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttendanceComponent", function() { return AttendanceComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_AuthService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/AuthService */ "./services/AuthService.ts");
/* harmony import */ var _services_CalendarService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/CalendarService */ "./services/CalendarService.ts");
/* harmony import */ var _services_GradeService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/GradeService */ "./services/GradeService.ts");
/* harmony import */ var _services_TeacherService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/TeacherService */ "./services/TeacherService.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AttendanceComponent = /** @class */ (function () {
    function AttendanceComponent(_authService, _calendarService, _gradeService, _teacherService) {
        this._authService = _authService;
        this._calendarService = _calendarService;
        this._gradeService = _gradeService;
        this._teacherService = _teacherService;
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
        this.showStudentGridServerMessage = false;
        this.calendarWeekId = 0;
        this.ctsGrade = "";
        this.teacherId = 0;
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
        this._gradeService.getGrades()
            .subscribe(function (result) {
            _this.isSelectGradeLoading = false;
            _this.Grades = result;
        }, function (err) {
            _this.isSelectGradeLoading = false;
            console.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
            if (err.status == "404") {
                // data not found
                _this.Grades = null;
            }
        });
    };
    AttendanceComponent.prototype.getCalendarWeeks = function () {
        var _this = this;
        this.isSelectCalendarWeekLoading = true;
        this._calendarService.getCalendarWeeks()
            .subscribe(function (result) {
            _this.isSelectCalendarWeekLoading = false;
            _this.CalendarWeeks = result;
        }, function (err) {
            _this.isSelectCalendarWeekLoading = false;
            console.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
            if (err.status == "404") {
                // data not found
                _this.CalendarWeeks = null;
            }
        });
    };
    AttendanceComponent.prototype.onSelectCalendarWeek = function (value) {
        this.calendarWeekId = value;
        //console.log("selected calendarWeekId = " + value);
        this.displayStudentWeekGradeGrid();
    };
    AttendanceComponent.prototype.onSelectGrade = function (value) {
        //console.log("selected grade = " + value);
        this.studentGridServerMessage = "";
        this.showStudentGridServerMessage = false;
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
            console.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
            if (err.status == "404") {
                // data not found
                _this.Teachers = null;
            }
        });
    };
    AttendanceComponent.prototype.displayStudentWeekGradeGrid = function () {
        if (this.calendarWeekId != 0 && this.teacherId != 0) {
            this.studentGridServerMessage = "";
            this.showStudentGridServerMessage = false;
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
        this.studentGridServerMessage = "";
        this.showStudentGridServerMessage = false;
        this._teacherService.getStudentWeekGrades(this.teacherId, this.calendarWeekId)
            .subscribe(function (result) {
            _this.isStudentWeekGradeGridLoading = false;
            _this.StudentWeekGrades = result;
            if (_this.StudentWeekGrades == null) {
                _this.showStudentGridServerMessage = true;
                _this.showStudentWeekGradeGrid = false;
                _this.studentGridServerMessage = "No Students assigned to selected teacher !";
            }
            else {
                _this.showStudentGridServerMessage = false;
                _this.showStudentWeekGradeGrid = true;
            }
        }, function (err) {
            _this.isStudentWeekGradeGridLoading = false;
            console.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
            _this.StudentWeekGrades = null;
            _this.studentGridServerMessage = "Error Occured while retrieving information : " + err.statusText;
            _this.showStudentGridServerMessage = true;
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
        this.StudentWeekGrades = null;
        this.teacherId = 0;
    };
    AttendanceComponent.prototype.saveClick = function () {
        console.log("Save clicked");
        console.log(this.StudentWeekGrades[0].attendance);
        console.log(this.StudentWeekGrades[0].homework);
        console.log(this.StudentWeekGrades[0].reading);
        console.log(this.StudentWeekGrades[0].writing);
        console.log(this.StudentWeekGrades[0].speaking);
        console.log(this.StudentWeekGrades[0].behavior);
        console.log(this.StudentWeekGrades[0].quiz);
        console.log(this.StudentWeekGrades[0].notes);
    };
    AttendanceComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./attendance.html */ "./components/attendance/attendance.html")
        }),
        __metadata("design:paramtypes", [_services_AuthService__WEBPACK_IMPORTED_MODULE_1__["AuthService"],
            _services_CalendarService__WEBPACK_IMPORTED_MODULE_2__["CalendarService"],
            _services_GradeService__WEBPACK_IMPORTED_MODULE_3__["GradeService"],
            _services_TeacherService__WEBPACK_IMPORTED_MODULE_4__["TeacherService"]])
    ], AttendanceComponent);
    return AttendanceComponent;
}());



/***/ }),

/***/ "./components/attendance/attendance.html":
/*!**********************************************************!*\
  !*** ../clientapp/components/attendance/attendance.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header class=\"container-fluid p0\">\r\n    <nav class=\"navbar navbar-light navbar-expand-md bgcolorMenu\">\r\n        <div class=\"row \">\r\n            <button class=\"navbar-toggler\" data-toggle=\"collapse\" data-target=\"#menuBar\">\r\n                <span class=\"navbar-toggler-icon\"></span>\r\n            </button>\r\n            <div id=\"menuBar\" class=\"navbar-collapse collapse\">\r\n                <ul class=\"navbar-nav\">\r\n                    <li class=\"nav-item\"><a class=\"nav-link py-0\" routerLink=\"/home\">Home</a></li>\r\n                    <li *ngIf=\"isLoggedOn\" class=\"nav-item active\"><a class=\"nav-link py-0\" routerLink=\"/attendance\">Attendance</a></li>\r\n                    <!--<li class=\"nav-item\"><a class=\"nav-link py-0\" routerLink=\"/contactus\">Contact Us</a></li>\r\n                    <li class=\"nav-item\"><a class=\"nav-link py-0\">About Us</a></li>-->\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </nav>\r\n\r\n</header>\r\n<div class=\"container p0 mt10\">\r\n    <!--<h4 class=\"text-center\">{{pageTitle}}</h4>-->\r\n    \r\n    <div class=\"row bgBar br5 m5 p5\">\r\n        <div class=\"col-md-4\">\r\n            <div class=\"input-group\">\r\n                <label for=\"selectCalenderWeek\" class=\"mt5\">Week</label>\r\n                <img *ngIf=\"isSelectCalendarWeekLoading\" src=\"/img/Loading.gif\" height=\"40\" width=\"40\" class=\"ml10\"/>\r\n                <select *ngIf=\"!isSelectCalendarWeekLoading\" name=\"selectCalenderWeek\" class=\"ml10 selectpicker form-control selectWidth\" (change)=\"onSelectCalendarWeek($event.target.value)\">\r\n                    <option value=\"0\">--Select Week--</option>\r\n                    <option *ngFor=\"let week of CalendarWeeks\" value={{week.weekNo}}>\r\n                        {{week.description}} - {{week.weekDate | date: 'MM/dd/yyyy'}}\r\n                    </option>\r\n                </select>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-4\">\r\n            <div class=\"input-group\">\r\n                <label for=\"selectGrade\" class=\"mt5\">Grade</label>\r\n                <img *ngIf=\"isSelectGradeLoading\" src=\"/img/Loading.gif\" height=\"40\" width=\"40\" class=\"ml10\"/>\r\n                <select *ngIf=\"!isSelectGradeLoading\" name=\"selectGrade\" class=\"ml10 selectpicker form-control selectWidth\" (change)=\"onSelectGrade($event.target.value)\">\r\n                    <option value=\"0\">--Select Grade--</option>\r\n                    <option *ngFor=\"let grade of Grades\" value={{grade.ctsGrade}}>\r\n                        {{grade.ctsGrade}}\r\n                    </option>\r\n                </select>\r\n            </div>\r\n\r\n        </div>\r\n        <div class=\"col-md-4\">\r\n            <div class=\"input-group\">\r\n                <label for=\"selectTeacher\" class=\"mt5\">Teacher</label>\r\n                <img *ngIf=\"isSelectTeacherLoading\" src=\"/img/Loading.gif\" height=\"40\" width=\"40\" class=\"ml10\" />\r\n                <select *ngIf=\"!isSelectTeacherLoading\" name=\"selectTeacher\" class=\"ml10 selectpicker form-control selectWidth\" (change)=\"onSelectTeacher($event.target.value)\" [(ngModel)]=\"teacherId\">\r\n                    <option value=\"0\">--Select Teacher--</option>\r\n                    <option *ngFor=\"let teacher of Teachers\" value={{teacher.id}}>\r\n                        {{teacher.firstName}} {{teacher.lastName}} \r\n                    </option>\r\n                </select>\r\n            </div>\r\n        </div>\r\n        <!--<div class=\"col-md-2\">\r\n            <button class=\"btn btn-primary btn-sm right mt5\"><strong><i class=\"fa fa-list-ul\"></i> List Students</strong></button>\r\n        </div>-->\r\n    </div>\r\n    <div *ngIf=\"isStudentWeekGradeGridLoading\">Loading Student Grades. Please wait.<img src=\"/img/Loading.gif\" height=\"40\" width=\"40\" class=\"ml10\" /></div>\r\n    <div *ngIf=\"showStudentGridServerMessage\" class=\"mt10 ml10\" ><i class=\"fa fa-exclamation-triangle\"></i> {{studentGridServerMessage}} </div>\r\n    <div class=\"row\" *ngIf=\"showStudentWeekGradeGrid\">\r\n        <div class=\"col-md-12\">\r\n            <table class=\"table table-hover table-bordered table-sm font-small\" id=\"dev-table\">\r\n                <thead class=\"bgTableHead\">\r\n                    <tr>\r\n                        <th class=\"fw\">Student ID</th>\r\n                        <th class=\"fw w200\">First Name</th>\r\n                        <th class=\"fw w200\">Last Name</th>\r\n                        <th class=\"fw\">Attendance</th>\r\n                        <th class=\"fw\">Homework</th>\r\n                        <th class=\"fw\">Reading</th>\r\n                        <th class=\"fw\">Writing</th>\r\n                        <th class=\"fw\">Speaking</th>\r\n                        <th class=\"fw\">Behaviour</th>\r\n                        <th class=\"fw\">Quiz</th>\r\n                        <th class=\"fw w200\">Notes</th>\r\n\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    \r\n                    <tr *ngFor=\"let weekGrade of StudentWeekGrades\">\r\n                        <td>{{weekGrade.studentID}}</td>\r\n                        <td>{{weekGrade.firstName}}</td>\r\n                        <td>{{weekGrade.lastName}}</td>\r\n                        <td>\r\n                            <select class=\"left ml10 selectpicker\" (change)=\"selectAttendance(weekGrade, $event.target.value)\" [(ngModel)]=\"weekGrade.attendance\" required>\r\n                                <option value=\"Y\">Yes</option>\r\n                                <option value=\"N\">No</option>\r\n                            </select>\r\n                        </td>\r\n                        <td>\r\n                            <select class=\"left ml10 selectpicker\" (change)=\"selectScore(weekGrade, 'homework', $event.target.value)\" [(ngModel)]=\"weekGrade.homework\">\r\n                                <option *ngFor=\"let score of Scores\" value={{score}}>\r\n                                    {{score}}\r\n                                </option>\r\n                            </select>\r\n                        </td>\r\n                        <td>\r\n                            <select class=\"left ml10 selectpicker\" (change)=\"selectScore(weekGrade, 'reading', $event.target.value)\" [(ngModel)]=\"weekGrade.reading\">\r\n                                <option *ngFor=\"let score of Scores\" value={{score}}>\r\n                                    {{score}}\r\n                                </option>\r\n                            </select>\r\n                        </td>\r\n                        <td>\r\n                            <select class=\"left ml10 selectpicker\" (change)=\"selectScore(weekGrade, 'writing', $event.target.value)\" [(ngModel)]=\"weekGrade.writing\">\r\n                                <option *ngFor=\"let score of Scores\" value={{score}}>\r\n                                    {{score}}\r\n                                </option>\r\n                            </select>\r\n                        </td>\r\n                        <td>\r\n                            <select class=\"left ml10 selectpicker\" (change)=\"selectScore(weekGrade, 'speaking', $event.target.value)\" [(ngModel)]=\"weekGrade.speaking\">\r\n                                <option *ngFor=\"let score of Scores\" value={{score}}>\r\n                                    {{score}}\r\n                                </option>\r\n                            </select>\r\n                        </td>\r\n                        <td>\r\n                            <select class=\"left ml10 selectpicker\" (change)=\"selectScore(weekGrade, 'behavior', $event.target.value)\" [(ngModel)]=\"weekGrade.behavior\">\r\n                                <option *ngFor=\"let score of Scores\" value={{score}}>\r\n                                    {{score}}\r\n                                </option>\r\n                            </select>\r\n                        </td>\r\n                        <td>\r\n                            <select class=\"left ml10 selectpicker\" (change)=\"selectScore(weekGrade, 'quiz', $event.target.value)\" [(ngModel)]=\"weekGrade.quiz\">\r\n                                <option *ngFor=\"let score of Scores\" value={{score}}>\r\n                                    {{score}}\r\n                                </option>\r\n                            </select>\r\n                        </td>\r\n                        <td><textarea [(ngModel)]=\"weekGrade.notes\" >{{weekGrade.notes}}</textarea></td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n    <div class=\"row row bgBar br5 m5 p5\" *ngIf=\"showStudentWeekGradeGrid\">\r\n        <div class=\"col-md-4\"></div>\r\n        <div class=\"col-md-4 \">\r\n            <button class=\"btn btn-primary btn-sm\" type=\"button\" (click)=\"cancelClick()\"><strong><i class=\"fa fa-times-circle\"></i> Cancel</strong></button>\r\n            <button class=\"btn btn-primary btn-sm ml10\" (click)=\"saveClick()\" type=\"submit\"><strong><i class=\"fa fa-save\" ></i> Save</strong></button>\r\n        </div>\r\n        <div class=\"col-md-4\"></div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./components/contact/Contact.ts":
/*!**************************************************!*\
  !*** ../clientapp/components/contact/Contact.ts ***!
  \**************************************************/
/*! exports provided: ContactComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactComponent", function() { return ContactComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_AuthService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/AuthService */ "./services/AuthService.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContactComponent = /** @class */ (function () {
    function ContactComponent(_authService) {
        this._authService = _authService;
        this.pageTitle = "Contact Us";
        this.userName = '';
    }
    ContactComponent.prototype.ngOnInit = function () {
        this.isLoggedOn = this._authService.getIsLoggedOn();
        this.userName = this._authService.getUserName();
    };
    ContactComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./contact.html */ "./components/contact/contact.html")
        }),
        __metadata("design:paramtypes", [_services_AuthService__WEBPACK_IMPORTED_MODULE_1__["AuthService"]])
    ], ContactComponent);
    return ContactComponent;
}());



/***/ }),

/***/ "./components/contact/contact.html":
/*!****************************************************!*\
  !*** ../clientapp/components/contact/contact.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header class=\"container-fluid p0\">\r\n    <nav class=\"navbar navbar-light navbar-expand-md bgcolorMenu\">\r\n        <div class=\"row \">\r\n            <button class=\"navbar-toggler\" data-toggle=\"collapse\" data-target=\"#menuBar\">\r\n                <span class=\"navbar-toggler-icon\"></span>\r\n            </button>\r\n            <div id=\"menuBar\" class=\"navbar-collapse collapse\">\r\n                <ul class=\"navbar-nav\">\r\n                    <li class=\"nav-item\"><a class=\"nav-link py-0\" routerLink=\"/home\">Home</a></li>\r\n                    <li *ngIf=\"isLoggedOn\" class=\"nav-item\"><a class=\"nav-link py-0\" routerLink=\"/attendance\">Attendance</a></li>\r\n                    <li class=\"nav-item active\"><a class=\"nav-link py-0\" routerLink=\"/contactus\">Contact Us</a></li>\r\n                    <li class=\"nav-item\"><a class=\"nav-link py-0\">About Us</a></li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </nav>\r\n</header>\r\n<div class=\"container-fluid p0\">\r\n    <h4 class=\"text-center\">{{pageTitle}}</h4>\r\n    <div class=\"col-md-6 offset-md-3\">\r\n        <div class=\"card card-body bg-light\">\r\n            <div class=\"form-group\">\r\n                <label for=\"UserName\">Name:</label>\r\n                <input id=\"UserName\" name=\"UserName\" type=\"text\" class=\"form-control\" />\r\n                <span id=\"errorUserName\" class=\"text-danger\"></span>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label for=\"UserEmail\">Email:</label>\r\n                <input id=\"UserEmail\" name=\"UserEmail\" type=\"email\" class=\"form-control\" />\r\n                <span id=\"errorUserEmail\" class=\"text-danger\"></span>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label for=\"Subject\">Phone:</label>\r\n                <input id=\"Phone\" name=\"Phone\" type=\"text\" class=\"form-control\" />\r\n                <span id=\"Phone\" class=\"text-danger\"></span>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label for=\"Subject\">Subject:</label>\r\n                <input id=\"Subject\" name=\"Subject\" type=\"text\" class=\"form-control\" />\r\n                <span id=\"Subject\" class=\"text-danger\"></span>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label for=\"Message\">Message:</label>\r\n                <textarea id=\"Message\" name=\"Message\" class=\"form-control\"></textarea>\r\n                <span id=\"Message\" class=\"text-danger\"></span>\r\n            </div>\r\n            <div class=\"form-group\">\r\n\r\n                <button type=\"submit\" class=\"btn btn-primary btn-sm\"><i class=\"fa fa-envelope\"> </i> Send Message</button>\r\n                <div class=\"text-success\"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./components/home/Home.ts":
/*!********************************************!*\
  !*** ../clientapp/components/home/Home.ts ***!
  \********************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_AuthService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/AuthService */ "./services/AuthService.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = /** @class */ (function () {
    function HomeComponent(_authService) {
        this._authService = _authService;
        this.pageTitle = 'Home Page';
        this.userName = '';
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.isLoggedOn = this._authService.getIsLoggedOn();
        this.userName = this._authService.getUserName();
        this.CarouselImages = [
            { src: "/img/Carousel-1.jpg", alt: 'First', slideTo: "0" },
            { src: "/img/Carousel-2.jpg", alt: 'Second', slideTo: "1" },
            { src: "/img/Carousel-3.jpg", alt: 'Third', slideTo: "2" },
            { src: "/img/Carousel-4.jpg", alt: 'Fourth', slideTo: "3" },
            { src: "/img/Carousel-5.jpg", alt: 'Fifth', slideTo: "4" }
        ];
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./home.html */ "./components/home/home.html")
        }),
        __metadata("design:paramtypes", [_services_AuthService__WEBPACK_IMPORTED_MODULE_1__["AuthService"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./components/home/home.html":
/*!**********************************************!*\
  !*** ../clientapp/components/home/home.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header class=\"container-fluid p0\">\r\n    <nav class=\"navbar navbar-light navbar-expand-md bgcolorMenu\">\r\n        <div class=\"row \">\r\n            <button class=\"navbar-toggler\" data-toggle=\"collapse\" data-target=\"#menuBar\">\r\n                <span class=\"navbar-toggler-icon\"></span>\r\n            </button>\r\n            <div id=\"menuBar\" class=\"navbar-collapse collapse\">\r\n                <ul class=\"navbar-nav\">\r\n                    <li class=\"nav-item active\"><a class=\"nav-link py-0\" routerLink=\"/home\">Home</a></li>\r\n                    <li *ngIf=\"isLoggedOn\" class=\"nav-item\"><a class=\"nav-link py-0\" routerLink=\"/attendance\">Attendance</a></li>\r\n                    <!--<li class=\"nav-item\"><a class=\"nav-link py-0\" routerLink=\"/contactus\">Contact Us</a></li>\r\n                    <li class=\"nav-item\"><a class=\"nav-link py-0\">About Us</a></li>-->\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </nav>\r\n</header>\r\n<div class=\"container-fluid p0\">\r\n    <!--<h4 class=\"text-center\">{{pageTitle}}</h4>-->\r\n    <h5 *ngIf=\"isLoggedOn\">Welcome {{userName}}</h5>\r\n    <div class=\"row m5 p5\">\r\n        <div class=\"col-md-3\">\r\n            <p>\r\n                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor dui vel est consequat malesuada. Proin nec leo quam. Aliquam massa dolor, ullamcorper et orci nec, imperdiet tempus justo. Fusce risus tortor, scelerisque nec sagittis et, tincidunt non lectus. Proin suscipit pharetra nisl. Curabitur sagittis dictum facilisis. Nam pretium luctus.\r\n            </p>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n           <div id=\"carouselExampleIndicators\" class=\"carousel slide\" data-ride=\"carousel\" data-interval=\"2000\">\r\n                <ol class=\"carousel-indicators\">\r\n                    <li data-target=\"#carouselExampleIndicators\" data-slide-to=\"0\" class=\"active\"></li>\r\n                    <li data-target=\"#carouselExampleIndicators\" data-slide-to=\"1\" ></li>\r\n                    <li data-target=\"#carouselExampleIndicators\" data-slide-to=\"2\" ></li>\r\n                    <li data-target=\"#carouselExampleIndicators\" data-slide-to=\"3\" ></li>\r\n                    <li data-target=\"#carouselExampleIndicators\" data-slide-to=\"4\" ></li>\r\n                </ol>\r\n                <div class=\"carousel-inner\">\r\n                    <div class=\"carousel-item active\" >\r\n                        <img class=\"d-block w90p\" src=\"/img/Carousel-1.jpg\" alt=\"First\">\r\n                    </div>\r\n                    <div class=\"carousel-item \" >\r\n                        <img class=\"d-block w90p\" src=\"/img/Carousel-2.jpg\" alt=\"Second\">\r\n                    </div>\r\n                    <div class=\"carousel-item \">\r\n                        <img class=\"d-block w90p\" src=\"/img/Carousel-3.jpg\" alt=\"Third\">\r\n                    </div>\r\n                    <div class=\"carousel-item \">\r\n                        <img class=\"d-block w90p\" src=\"/img/Carousel-4.jpg\" alt=\"Fourth\">\r\n                    </div>\r\n                    <div class=\"carousel-item \">\r\n                        <img class=\"d-block w90p\" src=\"/img/Carousel-5.jpg\" alt=\"Fifth\">\r\n                    </div>\r\n                </div>\r\n                <a class=\"carousel-control-prev\" href=\"#carouselExampleIndicators\" role=\"button\" data-slide=\"prev\">\r\n                    <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\r\n                    <span class=\"sr-only\">Previous</span>\r\n                </a>\r\n                <a class=\"carousel-control-next\" href=\"#carouselExampleIndicators\" role=\"button\" data-slide=\"next\">\r\n                    <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\r\n                    <span class=\"sr-only\">Next</span>\r\n                </a>\r\n\r\n\r\n\r\n              <!--<ol class=\"carousel-indicators\">\r\n                <li data-target=\"#carouselExampleIndicators\" data-slide-to=\"0\" class=\"active\"></li>\r\n                <li data-target=\"#carouselExampleIndicators\" data-slide-to=\"1\"></li>\r\n                <li data-target=\"#carouselExampleIndicators\" data-slide-to=\"2\"></li>\r\n              </ol>\r\n              <div class=\"carousel-inner\">\r\n                <div class=\"carousel-item active\">\r\n                  <img class=\"d-block w-100\" src=\"...\" alt=\"First slide\">\r\n                </div>\r\n                <div class=\"carousel-item\">\r\n                  <img class=\"d-block w-100\" src=\"...\" alt=\"Second slide\">\r\n                </div>\r\n                <div class=\"carousel-item\">\r\n                  <img class=\"d-block w-100\" src=\"...\" alt=\"Third slide\">\r\n                </div>\r\n              </div>\r\n              <a class=\"carousel-control-prev\" href=\"#carouselExampleIndicators\" role=\"button\" data-slide=\"prev\">\r\n                <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\r\n                <span class=\"sr-only\">Previous</span>\r\n              </a>\r\n              <a class=\"carousel-control-next\" href=\"#carouselExampleIndicators\" role=\"button\" data-slide=\"next\">\r\n                <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\r\n                <span class=\"sr-only\">Next</span>\r\n              </a>-->\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-3\">\r\n            <p>\r\n                Aliquam molestie lacus vehicula, sodales felis vel, dictum nunc. Morbi hendrerit turpis vitae leo ornare.\r\n            </p>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./environments/environment.ts":
/*!************************************************!*\
  !*** ../clientapp/environments/environment.ts ***!
  \************************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./main.ts":
/*!****************************!*\
  !*** ../clientapp/main.ts ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "../node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ "./routes.ts":
/*!******************************!*\
  !*** ../clientapp/routes.ts ***!
  \******************************/
/*! exports provided: AppRoutes, AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutes", function() { return AppRoutes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _components_home_Home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/home/Home */ "./components/home/Home.ts");
/* harmony import */ var _components_attendance_Attendance__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/attendance/Attendance */ "./components/attendance/Attendance.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AppRoutes = [
    { path: "", redirectTo: 'home', pathMatch: 'full' },
    { path: "attendance", component: _components_attendance_Attendance__WEBPACK_IMPORTED_MODULE_3__["AttendanceComponent"] },
    { path: "home", component: _components_home_Home__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"] }
    //{ path : "contactus", component: ContactComponent}
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(AppRoutes, { useHash: true, enableTracing: false })],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./services/AuthService.ts":
/*!********************************************!*\
  !*** ../clientapp/services/AuthService.ts ***!
  \********************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AuthService = /** @class */ (function () {
    function AuthService() {
        if (AuthService_1.instance == null) {
            AuthService_1.instance = this;
        }
        return AuthService_1.instance;
    }
    AuthService_1 = AuthService;
    AuthService.prototype.setAuthToken = function (token) {
        this.authToken = token;
    };
    AuthService.prototype.getAuthToken = function () {
        return this.authToken;
    };
    AuthService.prototype.setEmail = function (email) {
        this.email = email;
    };
    AuthService.prototype.getEmail = function () {
        return this.email;
    };
    AuthService.prototype.setUserName = function (userName) {
        this.userName = userName;
    };
    AuthService.prototype.getUserName = function () {
        return this.userName;
    };
    AuthService.prototype.setIsLoggedOn = function (isLoggedOn) {
        this.isLoggedOn = isLoggedOn;
    };
    AuthService.prototype.getIsLoggedOn = function () {
        return this.isLoggedOn;
    };
    var AuthService_1;
    AuthService = AuthService_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./services/CalendarService.ts":
/*!************************************************!*\
  !*** ../clientapp/services/CalendarService.ts ***!
  \************************************************/
/*! exports provided: CalendarService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalendarService", function() { return CalendarService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "../node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CalendarService = /** @class */ (function () {
    function CalendarService(_http) {
        this._http = _http;
    }
    //private weeks : CalendarWeek[] = [
    //    {
    //        Id: 1,
    //        CalendarYearId: 1,
    //        WeekNo: 1,
    //        Description: "08/26/2018",
    //        TermNo: 1
    //    },
    //    {
    //        Id: 2,
    //        CalendarYearId: 1,
    //        WeekNo: 2,
    //        Description: "09/09/2018",
    //        TermNo: 1
    //    },
    //    {
    //        Id: 3,
    //        CalendarYearId: 1,
    //        WeekNo: 3,
    //        Description: "09/16/2018",
    //        TermNo: 1
    //    }
    //];
    CalendarService.prototype.getCalendarWeeks = function () {
        //this.weeks[0].WeekDate = new Date(2018, 08, 26);
        //this.weeks[1].WeekDate = new Date(2018, 09, 09);
        //return this.weeks;
        return this._http.get('/api/calendar/weeks');
    };
    CalendarService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], CalendarService);
    return CalendarService;
}());



/***/ }),

/***/ "./services/GradeService.ts":
/*!*********************************************!*\
  !*** ../clientapp/services/GradeService.ts ***!
  \*********************************************/
/*! exports provided: GradeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GradeService", function() { return GradeService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "../node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GradeService = /** @class */ (function () {
    function GradeService(_http) {
        this._http = _http;
    }
    GradeService.prototype.getGrades = function () {
        return this._http.get('/api/grade/grades');
    };
    GradeService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], GradeService);
    return GradeService;
}());



/***/ }),

/***/ "./services/LoggerService.ts":
/*!**********************************************!*\
  !*** ../clientapp/services/LoggerService.ts ***!
  \**********************************************/
/*! exports provided: LoggerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoggerService", function() { return LoggerService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../environments/environment */ "./environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoggerService = /** @class */ (function () {
    function LoggerService() {
        if (LoggerService_1.instance == null) {
            LoggerService_1.instance = this;
        }
        return LoggerService_1.instance;
    }
    LoggerService_1 = LoggerService;
    LoggerService.prototype.logMessage = function (message) {
        if (!_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
            console.log(message);
        }
    };
    var LoggerService_1;
    LoggerService = LoggerService_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], LoggerService);
    return LoggerService;
}());



/***/ }),

/***/ "./services/TeacherService.ts":
/*!***********************************************!*\
  !*** ../clientapp/services/TeacherService.ts ***!
  \***********************************************/
/*! exports provided: TeacherService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeacherService", function() { return TeacherService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "../node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TeacherService = /** @class */ (function () {
    function TeacherService(_http) {
        this._http = _http;
    }
    TeacherService.prototype.getTeachersByGrade = function (grade) {
        return this._http.get('/api/Teacher/teacherbygrade/' + grade);
    };
    TeacherService.prototype.getStudentWeekGrades = function (teacherId, weekId) {
        return this._http.get('/api/Teacher/teacherbyid/' + teacherId + '/studentgrades/' + weekId);
    };
    TeacherService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], TeacherService);
    return TeacherService;
}());



/***/ }),

/***/ 0:
/*!**********************************!*\
  !*** multi ../clientapp/main.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Data\Code\CTSApp\CTSWebApp\clientapp\main.ts */"./main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map