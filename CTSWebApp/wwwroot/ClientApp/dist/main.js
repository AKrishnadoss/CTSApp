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
/* harmony import */ var _services_LoggerService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/LoggerService */ "./services/LoggerService.ts");
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
    function AppComponent(_authService, _loggerService) {
        this._authService = _authService;
        this._loggerService = _loggerService;
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
        var expiresByElement = document.getElementById("hdnExpires");
        if (expiresByElement != null) {
            this.expiresBy = new Date(expiresByElement.innerText);
        }
        var loginLinkElement = document.getElementById("loginLink");
        var logoutLinkElement = document.getElementById("logoutLink");
        var loggedinElement = document.getElementById("loggedInAs");
        if (this.token == null) {
            this._loggerService.log('Getting from localStorage');
            this.token = localStorage.getItem('token');
            this.userName = localStorage.getItem('userName');
            this.email = localStorage.getItem('email');
            var temp = localStorage.getItem('expiresBy');
            if (temp != null) {
                this.expiresBy = new Date(temp);
            }
            if (this.token != null) {
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
                this._authService.setExpiresBy(this.expiresBy);
            }
            else {
                this._loggerService.log('localStorage is null');
                this.isLogonSuccessful = false;
                this._authService.setAuthToken('');
                this._authService.setEmail('');
                this._authService.setUserName('');
                this._authService.setExpiresBy(null);
            }
        }
        else {
            this._loggerService.log('Setting localStorage');
            localStorage.setItem('token', this.token);
            localStorage.setItem('userName', this.userName);
            localStorage.setItem('email', this.email);
            localStorage.setItem('expiresBy', this.expiresBy.toLocaleString());
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
            this._authService.setExpiresBy(this.expiresBy);
        }
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ctsApp',
            template: __webpack_require__(/*! ./app.component.html */ "./app/app.component.html")
        }),
        __metadata("design:paramtypes", [_services_AuthService__WEBPACK_IMPORTED_MODULE_1__["AuthService"],
            _services_LoggerService__WEBPACK_IMPORTED_MODULE_2__["LoggerService"]])
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
/* harmony import */ var _interceps_AuthInterceptor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../interceps/AuthInterceptor */ "./interceps/AuthInterceptor.ts");
/* harmony import */ var _services_AuthService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/AuthService */ "./services/AuthService.ts");
/* harmony import */ var _services_CalendarService__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/CalendarService */ "./services/CalendarService.ts");
/* harmony import */ var _services_GradeService__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../services/GradeService */ "./services/GradeService.ts");
/* harmony import */ var _services_TeacherService__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../services/TeacherService */ "./services/TeacherService.ts");
/* harmony import */ var _services_StudentService__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../services/StudentService */ "./services/StudentService.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./app.component */ "./app/app.component.ts");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../routes */ "./routes.ts");
/* harmony import */ var _components_home_Home__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../components/home/Home */ "./components/home/Home.ts");
/* harmony import */ var _components_contact_Contact__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../components/contact/Contact */ "./components/contact/Contact.ts");
/* harmony import */ var _components_attendance_Attendance__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../components/attendance/Attendance */ "./components/attendance/Attendance.ts");
/* harmony import */ var _components_score_Scores__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../components/score/Scores */ "./components/score/Scores.ts");
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
                _app_component__WEBPACK_IMPORTED_MODULE_12__["AppComponent"],
                _components_home_Home__WEBPACK_IMPORTED_MODULE_14__["HomeComponent"],
                _components_attendance_Attendance__WEBPACK_IMPORTED_MODULE_16__["AttendanceComponent"],
                _components_contact_Contact__WEBPACK_IMPORTED_MODULE_15__["ContactComponent"],
                _components_score_Scores__WEBPACK_IMPORTED_MODULE_17__["ScoresComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_2__["HttpModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                _routes__WEBPACK_IMPORTED_MODULE_13__["AppRoutingModule"]
            ],
            providers: [_services_AuthService__WEBPACK_IMPORTED_MODULE_7__["AuthService"], _services_LoggerService__WEBPACK_IMPORTED_MODULE_5__["LoggerService"], _services_CalendarService__WEBPACK_IMPORTED_MODULE_8__["CalendarService"], _services_GradeService__WEBPACK_IMPORTED_MODULE_9__["GradeService"], _services_TeacherService__WEBPACK_IMPORTED_MODULE_10__["TeacherService"], _services_StudentService__WEBPACK_IMPORTED_MODULE_11__["StudentService"],
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HTTP_INTERCEPTORS"], useClass: _interceps_AuthInterceptor__WEBPACK_IMPORTED_MODULE_6__["AuthInterceptor"], multi: true }
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_12__["AppComponent"]]
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
/* harmony import */ var _model_Grade__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../model/Grade */ "./model/Grade.ts");
/* harmony import */ var _services_TeacherService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/TeacherService */ "./services/TeacherService.ts");
/* harmony import */ var _services_StudentService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/StudentService */ "./services/StudentService.ts");
/* harmony import */ var _services_LoggerService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/LoggerService */ "./services/LoggerService.ts");
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
        if (!this._authService.hasAccess("Attendance")) {
            // TODO: navigate to unauthorized page
            this._loggerService.log("Unauthorized access");
            //window.location.href = "/error";
        }
        this._loggerService.log("Access is authorized");
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
        this.selectedGrade = "0";
        this.selectedTeacherId = 0;
        this.calendarWeekLoadError = "";
        this.gradeLoadError = "";
        this.selectGradeEnabled = true;
        this.selectTeachedEnabled = true;
        this.getCalendarWeeks();
        if (this._authService.hasAccess("Attendance.GradeSelection")) {
            this.getGrades();
        }
        else {
            this.getGradeAndTeacherDetails();
        }
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
                gr.push(new _model_Grade__WEBPACK_IMPORTED_MODULE_4__["Grade"](_this.Teachers[0].ctsGrade, _this.Teachers[0].ctsGrade));
                _this.Grades = gr;
                _this.selectedGrade = _this.Teachers[0].ctsGrade;
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
        if (this._authService.hasAccess("Attendance.GradeSelection")) {
            this.selectedGrade = "0";
            this.selectedTeacherId = 0;
        }
        else {
            this.getGradeAndTeacherDetails();
        }
        this.displayStudentWeekGradeGrid();
    };
    AttendanceComponent.prototype.onSelectGrade = function (value) {
        if (this._authService.hasAccess("Attendance.TeacherSelection")) {
            this.studentGridServerErrorMessage = "";
            this.showStudentGridServerErrorMessage = false;
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
            this.showStudentGridServerErrorMessage = false;
            this.studentGridServerWarningMessage = "";
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
        this.studentGridServerWarningMessage = "";
        this._teacherService.getStudentWeekGrades(this.selectedTeacherId, this.calendarWeekId)
            .subscribe(function (result) {
            _this.isStudentWeekGradeGridLoading = false;
            _this.StudentWeekGrades = result;
            if (_this.StudentWeekGrades == null) {
                _this.showStudentGridServerErrorMessage = true;
                _this.showStudentWeekGradeGrid = false;
                _this.studentGridServerErrorMessage = "No Student(s) assigned to selected teacher.";
            }
            else {
                if (result.length > 0) {
                    if (result[0].dataFreeze == 'Y') {
                        _this.isStudentWeekGradeGridReadOnly = true;
                    }
                    else {
                        _this.isStudentWeekGradeGridReadOnly = false;
                    }
                    if (result[0].id == 0) {
                        _this.studentGridServerWarningMessage = "Note: Data not entered for this week, showing default entries";
                        console.log(_this.studentGridServerWarningMessage);
                    }
                }
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
        if (value == '0') {
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
        this.studentGridServerWarningMessage = "";
        this.StudentWeekGrades = null;
        this.selectedTeacherId = 0;
    };
    AttendanceComponent.prototype.saveClick = function () {
        var _this = this;
        this.isStudentWeekGradeGridSaving = true;
        this.showStudentGridServerErrorMessage = false;
        this.studentGridServerErrorMessage = "";
        this.studentGridServerSuccessMessage = "";
        this.studentGridServerWarningMessage = "";
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
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./attendance.html */ "./components/attendance/attendance.html")
        }),
        __metadata("design:paramtypes", [_services_AuthService__WEBPACK_IMPORTED_MODULE_1__["AuthService"],
            _services_CalendarService__WEBPACK_IMPORTED_MODULE_2__["CalendarService"],
            _services_GradeService__WEBPACK_IMPORTED_MODULE_3__["GradeService"],
            _services_TeacherService__WEBPACK_IMPORTED_MODULE_5__["TeacherService"],
            _services_StudentService__WEBPACK_IMPORTED_MODULE_6__["StudentService"],
            _services_LoggerService__WEBPACK_IMPORTED_MODULE_7__["LoggerService"]])
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

module.exports = "<header class=\"container-fluid p0\">\r\n    <nav class=\"navbar navbar-light navbar-expand-md bgcolorMenu\">\r\n        <div class=\"row \">\r\n            <button class=\"navbar-toggler\" data-toggle=\"collapse\" data-target=\"#menuBar\">\r\n                <span class=\"navbar-toggler-icon\"></span>\r\n            </button>\r\n            <div id=\"menuBar\" class=\"navbar-collapse collapse\">\r\n                <ul class=\"navbar-nav\">\r\n                    <li class=\"nav-item\"><a class=\"nav-link py-0\" routerLink=\"/home\">Home</a></li>\r\n                    <li *ngIf=\"isLoggedOn\" class=\"nav-item active\"><a class=\"nav-link py-0\" routerLink=\"/attendance\">Attendance</a></li>\r\n                    <li *ngIf=\"isLoggedOn\" class=\"nav-item\"><a class=\"nav-link py-0\" routerLink=\"/scores\">Term Scores</a></li>\r\n                    <!--<li class=\"nav-item\"><a class=\"nav-link py-0\" routerLink=\"/contactus\">Contact Us</a></li>\r\n    <li class=\"nav-item\"><a class=\"nav-link py-0\">About Us</a></li>-->\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </nav>\r\n\r\n</header>\r\n<div class=\"container p0 mt10\">\r\n    <!--<h4 class=\"text-center\">{{pageTitle}}</h4>-->\r\n    \r\n    <div class=\"row bgBar br5 m5 p5\">\r\n        <div class=\"col-md-4\">\r\n            <div class=\"input-group\">\r\n                <label for=\"selectCalenderWeek\" class=\"mt5\">Week</label>\r\n                <img *ngIf=\"isSelectCalendarWeekLoading\" src=\"/img/Loading.gif\" height=\"40\" width=\"40\" class=\"ml10\"/>\r\n                <i *ngIf=\"calendarWeekLoadError\" class=\"fa fa-exclamation-triangle form-control errorText\"> {{calendarWeekLoadError}}</i>\r\n                <select *ngIf=\"!isSelectCalendarWeekLoading && !calendarWeekLoadError\" name=\"selectCalenderWeek\" class=\"ml10 selectpicker form-control selectWidth\" (change)=\"onSelectCalendarWeek($event.target.value)\">\r\n                    <option value=\"0\">--Select Week--</option>\r\n                    <option *ngFor=\"let week of CalendarWeeks\" value={{week.id}}>\r\n                        {{week.description}} - {{week.weekDate | date: 'MM/dd/yyyy'}}\r\n                    </option>\r\n                </select>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-4\">\r\n            <div class=\"input-group\">\r\n                <label for=\"selectGrade\" class=\"mt5\">Grade</label>\r\n                <img *ngIf=\"isSelectGradeLoading\" src=\"/img/Loading.gif\" height=\"40\" width=\"40\" class=\"ml10\"/>\r\n                <i *ngIf=\"gradeLoadError\" class=\"fa fa-exclamation-triangle form-control errorText\"> {{gradeLoadError}}</i>\r\n                <select *ngIf=\"!isSelectGradeLoading && !gradeLoadError\" name=\"selectGrade\" class=\"ml10 selectpicker form-control selectWidth\" \r\n                        (change)=\"onSelectGrade($event.target.value)\" [(ngModel)]=\"selectedGrade\" [disabled]=\"!selectGradeEnabled\">\r\n                    <option value=\"0\">--Select Grade--</option>\r\n                    <option *ngFor=\"let grade of Grades\" value={{grade.ctsGrade}}>\r\n                        {{grade.ctsGrade}}\r\n                    </option>\r\n                </select>\r\n            </div>\r\n\r\n        </div>\r\n        <div class=\"col-md-4\">\r\n            <div class=\"input-group\">\r\n                <label for=\"selectTeacher\" class=\"mt5\">Teacher</label>\r\n                <img *ngIf=\"isSelectTeacherLoading\" src=\"/img/Loading.gif\" height=\"40\" width=\"40\" class=\"ml10\" />\r\n                <select *ngIf=\"!isSelectTeacherLoading\" name=\"selectTeacher\" class=\"ml10 selectpicker form-control selectWidth\" \r\n                        (change)=\"onSelectTeacher($event.target.value)\" [(ngModel)]=\"selectedTeacherId\" [disabled]=\"!selectTeachedEnabled\">\r\n                    <option value=\"0\">--Select Teacher--</option>\r\n                    <option *ngFor=\"let teacher of Teachers\" value={{teacher.id}}>\r\n                        {{teacher.firstName}} {{teacher.lastName}} \r\n                    </option>\r\n                </select>\r\n            </div>\r\n        </div>\r\n        <!--<div class=\"col-md-2\">\r\n            <button class=\"btn btn-primary btn-sm right mt5\"><strong><i class=\"fa fa-list-ul\"></i> List Students</strong></button>\r\n        </div>-->\r\n    </div>\r\n    <div class=\"row\">\r\n        <div *ngIf=\"isStudentWeekGradeGridLoading\" class=\"col-md-12\">Loading Student Grades. Please wait.<img src=\"/img/Loading.gif\" height=\"40\" width=\"40\" class=\"ml10\" /></div>\r\n        <div *ngIf=\"studentGridServerWarningMessage\" class=\"col-md-12 mt10 ml10 errorText\"><i class=\"fa fa-exclamation-triangle\"></i> {{studentGridServerWarningMessage}} </div>\r\n    </div>\r\n    <div class=\"row\" *ngIf=\"showStudentWeekGradeGrid\">\r\n        <div class=\"col-md-12\" id=\"no-more-tables\">\r\n            <table class=\"table-bordered table-condensed cf\" id=\"dev-table\">\r\n                <thead class=\"bgTableHead cf\">\r\n                    <tr>\r\n                        <th class=\"fw\">ID</th>\r\n                        <th class=\"fw w150\">First Name</th>\r\n                        <th class=\"fw w150\">Last Name</th>\r\n                        <th class=\"fw\">Attendance</th>\r\n                        <th class=\"fw\">Homework</th>\r\n                        <th class=\"fw\">Reading</th>\r\n                        <th class=\"fw\">Writing</th>\r\n                        <th class=\"fw\">Speaking</th>\r\n                        <th class=\"fw\">Behaviour</th>\r\n                        <th class=\"fw\">Quiz</th>\r\n                        <th class=\"fw w200\">Notes</th>\r\n\r\n                    </tr>\r\n                </thead>\r\n                <tbody *ngIf=\"!isStudentWeekGradeGridReadOnly\">\r\n\r\n                    <tr *ngFor=\"let weekGrade of StudentWeekGrades\">\r\n                        <td data-title=\"ID\">{{weekGrade.studentID}}</td>\r\n                        <td data-title=\"First Name\">{{weekGrade.firstName}}</td>\r\n                        <td data-title=\"Last Name\">{{weekGrade.lastName}}</td>\r\n                        <td data-title=\"Attendance\">\r\n                            <select class=\"selectpicker form-control\" (change)=\"selectAttendance(weekGrade, $event.target.value)\" [(ngModel)]=\"weekGrade.attendance\" required>\r\n                                <option value=\"10\">Yes</option>\r\n                                <option value=\"0\">No</option>\r\n                            </select>\r\n                        </td>\r\n                        <td data-title=\"Homework\">\r\n                            <select class=\"selectpicker form-control\" (change)=\"selectScore(weekGrade, 'homework', $event.target.value)\" [(ngModel)]=\"weekGrade.homework\">\r\n                                <option *ngFor=\"let score of Scores\" value={{score}}>\r\n                                    {{score}}\r\n                                </option>\r\n                            </select>\r\n                        </td>\r\n                        <td data-title=\"Reading\">\r\n                            <select class=\"selectpicker form-control\" (change)=\"selectScore(weekGrade, 'reading', $event.target.value)\" [(ngModel)]=\"weekGrade.reading\">\r\n                                <option *ngFor=\"let score of Scores\" value={{score}}>\r\n                                    {{score}}\r\n                                </option>\r\n                            </select>\r\n                        </td>\r\n                        <td data-title=\"Writing\">\r\n                            <select class=\"selectpicker form-control\" (change)=\"selectScore(weekGrade, 'writing', $event.target.value)\" [(ngModel)]=\"weekGrade.writing\">\r\n                                <option *ngFor=\"let score of Scores\" value={{score}}>\r\n                                    {{score}}\r\n                                </option>\r\n                            </select>\r\n                        </td>\r\n                        <td data-title=\"Speaking\">\r\n                            <select class=\"selectpicker form-control\" (change)=\"selectScore(weekGrade, 'speaking', $event.target.value)\" [(ngModel)]=\"weekGrade.speaking\">\r\n                                <option *ngFor=\"let score of Scores\" value={{score}}>\r\n                                    {{score}}\r\n                                </option>\r\n                            </select>\r\n                        </td>\r\n                        <td data-title=\"Behavior\">\r\n                            <select class=\"selectpicker form-control\" (change)=\"selectScore(weekGrade, 'behavior', $event.target.value)\" [(ngModel)]=\"weekGrade.behavior\">\r\n                                <option *ngFor=\"let score of Scores\" value={{score}}>\r\n                                    {{score}}\r\n                                </option>\r\n                            </select>\r\n                        </td>\r\n                        <td data-title=\"Quiz\">\r\n                            <select class=\"selectpicker form-control\" (change)=\"selectScore(weekGrade, 'quiz', $event.target.value)\" [(ngModel)]=\"weekGrade.quiz\">\r\n                                <option *ngFor=\"let score of Scores\" value={{score}}>\r\n                                    {{score}}\r\n                                </option>\r\n                            </select>\r\n                        </td>\r\n                        <td data-title=\"Notes\"><textarea class=\"form-control rounded-3\" rows=\"1\" [(ngModel)]=\"weekGrade.notes\" maxlength=\"100\">{{weekGrade.notes}}</textarea></td>\r\n                    </tr>\r\n                </tbody>\r\n                <tbody *ngIf=\"isStudentWeekGradeGridReadOnly\">\r\n                    <tr *ngFor=\"let weekGrade of StudentWeekGrades\">\r\n                        <td data-title=\"ID\">{{weekGrade.studentID}}</td>\r\n                        <td data-title=\"First Name\">{{weekGrade.firstName}}</td>\r\n                        <td data-title=\"Last Name\">{{weekGrade.lastName}}</td>\r\n                        <td data-title=\"Attendance\">{{weekGrade.attendance}}</td>\r\n                        <td data-title=\"Homework\">{{weekGrade.homework}}</td>\r\n                        <td data-title=\"Reading\">{{weekGrade.reading}}</td>\r\n                        <td data-title=\"Writing\">{{weekGrade.writing}}</td>\r\n                        <td data-title=\"Speaking\">{{weekGrade.speaking}}</td>\r\n                        <td data-title=\"Behavior\">{{weekGrade.behavior}}</td>\r\n                        <td data-title=\"Quiz\">{{weekGrade.quiz}}</td>\r\n                        <td data-title=\"Notes\">{{weekGrade.notes}}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div *ngIf=\"studentGridServerErrorMessage\" class=\"col-md-12 mt10 ml10 errorText\"><i class=\"fa fa-exclamation-triangle\"></i> {{studentGridServerErrorMessage}} </div>\r\n        <div *ngIf=\"studentGridServerSuccessMessage\" class=\"col-md-12 mt10 ml10 successText\"><i class=\"fa fa-check-circle\"></i>  {{studentGridServerSuccessMessage}}</div>\r\n    </div>\r\n    <div class=\"row bgBar br5 m5 p5\" *ngIf=\"isStudentWeekGradeGridSaving\">\r\n        <div class=\"col-md-12\">Saving Student Grades. Please wait.<img src=\"/img/Loading.gif\" height=\"40\" width=\"40\" class=\"ml10\" /></div>\r\n    </div>\r\n    <div class=\"row bgBar br5 m5 p5\" *ngIf=\"showStudentWeekGradeGrid && !isStudentWeekGradeGridSaving\">\r\n        \r\n        <div class=\"col-md-4\" ></div>\r\n        <div class=\"col-md-4 \" >\r\n            <button class=\"btn btn-primary btn-sm\" type=\"button\" (click)=\"cancelClick()\"><strong><i class=\"fa fa-times-circle\"></i> Cancel</strong></button>\r\n            <button class=\"btn btn-primary btn-sm ml10\" (click)=\"saveClick()\" type=\"submit\" *ngIf=\"!isStudentWeekGradeGridReadOnly\"><strong><i class=\"fa fa-save\" ></i> Save</strong></button>\r\n        </div>\r\n        <div class=\"col-md-4\" ></div>\r\n    </div>\r\n</div>"

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
        if (this.isLoggedOn == false) {
            this.resetLoginControls();
        }
        else {
            this._authService.getAuthFunctions();
        }
        this.CarouselImages = [
            { src: "/img/Carousel-1.jpg", alt: 'First', slideTo: "0" },
            { src: "/img/Carousel-2.jpg", alt: 'Second', slideTo: "1" },
            { src: "/img/Carousel-3.jpg", alt: 'Third', slideTo: "2" },
            { src: "/img/Carousel-4.jpg", alt: 'Fourth', slideTo: "3" },
            { src: "/img/Carousel-5.jpg", alt: 'Fifth', slideTo: "4" }
        ];
    };
    HomeComponent.prototype.resetLoginControls = function () {
        var loginLinkElement = document.getElementById("loginLink");
        var logoutLinkElement = document.getElementById("logoutLink");
        var loggedinElement = document.getElementById("loggedInAs");
        if (loggedinElement != null) {
            loggedinElement.innerText = "";
        }
        if (loginLinkElement != null) {
            loginLinkElement.style.display = "block";
        }
        if (logoutLinkElement != null) {
            logoutLinkElement.style.display = "none";
        }
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

module.exports = "<header class=\"container-fluid p0\">\r\n    <nav class=\"navbar navbar-light navbar-expand-md bgcolorMenu\">\r\n        <div class=\"row \">\r\n            <button class=\"navbar-toggler\" data-toggle=\"collapse\" data-target=\"#menuBar\">\r\n                <span class=\"navbar-toggler-icon\"></span>\r\n            </button>\r\n            <div id=\"menuBar\" class=\"navbar-collapse collapse\">\r\n                <ul class=\"navbar-nav\">\r\n                    <li class=\"nav-item active\"><a class=\"nav-link py-0\" routerLink=\"/home\">Home</a></li>\r\n                    <li *ngIf=\"isLoggedOn\" class=\"nav-item\"><a class=\"nav-link py-0\" routerLink=\"/attendance\">Attendance</a></li>\r\n                    <li *ngIf=\"isLoggedOn\" class=\"nav-item\"><a class=\"nav-link py-0\" routerLink=\"/scores\">Term Scores</a></li>\r\n                    <!--<li class=\"nav-item\"><a class=\"nav-link py-0\" routerLink=\"/contactus\">Contact Us</a></li>\r\n    <li class=\"nav-item\"><a class=\"nav-link py-0\">About Us</a></li>-->\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </nav>\r\n</header>\r\n<div class=\"container-fluid p0\">\r\n    <!--<h4 class=\"text-center\">{{pageTitle}}</h4>-->\r\n    <h5 *ngIf=\"isLoggedOn\">Welcome {{userName}}</h5>\r\n    <div class=\"row m5 p5\">\r\n        <div class=\"col-md-3\">\r\n            <p>\r\n                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor dui vel est consequat malesuada. Proin nec leo quam. Aliquam massa dolor, ullamcorper et orci nec, imperdiet tempus justo. Fusce risus tortor, scelerisque nec sagittis et, tincidunt non lectus. Proin suscipit pharetra nisl. Curabitur sagittis dictum facilisis. Nam pretium luctus.\r\n            </p>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n           <div id=\"carouselExampleIndicators\" class=\"carousel slide\" data-ride=\"carousel\" data-interval=\"3000\">\r\n                <ol class=\"carousel-indicators\">\r\n                    <li data-target=\"#carouselExampleIndicators\" data-slide-to=\"0\" class=\"active\"></li>\r\n                    <li data-target=\"#carouselExampleIndicators\" data-slide-to=\"1\" ></li>\r\n                    <li data-target=\"#carouselExampleIndicators\" data-slide-to=\"2\" ></li>\r\n                    <li data-target=\"#carouselExampleIndicators\" data-slide-to=\"3\" ></li>\r\n                    <li data-target=\"#carouselExampleIndicators\" data-slide-to=\"4\" ></li>\r\n                </ol>\r\n                <div class=\"carousel-inner\">\r\n                    <div class=\"carousel-item active\" >\r\n                        <img class=\"d-block w90p\" src=\"/img/Carousel-1.jpg\" alt=\"First\">\r\n                    </div>\r\n                    <div class=\"carousel-item \" >\r\n                        <img class=\"d-block w90p\" src=\"/img/Carousel-2.jpg\" alt=\"Second\">\r\n                    </div>\r\n                    <div class=\"carousel-item \">\r\n                        <img class=\"d-block w90p\" src=\"/img/Carousel-3.jpg\" alt=\"Third\">\r\n                    </div>\r\n                    <div class=\"carousel-item \">\r\n                        <img class=\"d-block w90p\" src=\"/img/Carousel-4.jpg\" alt=\"Fourth\">\r\n                    </div>\r\n                    <div class=\"carousel-item \">\r\n                        <img class=\"d-block w90p\" src=\"/img/Carousel-5.jpg\" alt=\"Fifth\">\r\n                    </div>\r\n                </div>\r\n                <a class=\"carousel-control-prev\" href=\"#carouselExampleIndicators\" role=\"button\" data-slide=\"prev\">\r\n                    <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\r\n                    <span class=\"sr-only\">Previous</span>\r\n                </a>\r\n                <a class=\"carousel-control-next\" href=\"#carouselExampleIndicators\" role=\"button\" data-slide=\"next\">\r\n                    <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\r\n                    <span class=\"sr-only\">Next</span>\r\n                </a>\r\n\r\n\r\n\r\n              <!--<ol class=\"carousel-indicators\">\r\n                <li data-target=\"#carouselExampleIndicators\" data-slide-to=\"0\" class=\"active\"></li>\r\n                <li data-target=\"#carouselExampleIndicators\" data-slide-to=\"1\"></li>\r\n                <li data-target=\"#carouselExampleIndicators\" data-slide-to=\"2\"></li>\r\n              </ol>\r\n              <div class=\"carousel-inner\">\r\n                <div class=\"carousel-item active\">\r\n                  <img class=\"d-block w-100\" src=\"...\" alt=\"First slide\">\r\n                </div>\r\n                <div class=\"carousel-item\">\r\n                  <img class=\"d-block w-100\" src=\"...\" alt=\"Second slide\">\r\n                </div>\r\n                <div class=\"carousel-item\">\r\n                  <img class=\"d-block w-100\" src=\"...\" alt=\"Third slide\">\r\n                </div>\r\n              </div>\r\n              <a class=\"carousel-control-prev\" href=\"#carouselExampleIndicators\" role=\"button\" data-slide=\"prev\">\r\n                <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\r\n                <span class=\"sr-only\">Previous</span>\r\n              </a>\r\n              <a class=\"carousel-control-next\" href=\"#carouselExampleIndicators\" role=\"button\" data-slide=\"next\">\r\n                <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\r\n                <span class=\"sr-only\">Next</span>\r\n              </a>-->\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-3\">\r\n            <p>\r\n                Aliquam molestie lacus vehicula, sodales felis vel, dictum nunc. Morbi hendrerit turpis vitae leo ornare.\r\n            </p>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./components/score/Scores.ts":
/*!***********************************************!*\
  !*** ../clientapp/components/score/Scores.ts ***!
  \***********************************************/
/*! exports provided: ScoresComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScoresComponent", function() { return ScoresComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_AuthService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/AuthService */ "./services/AuthService.ts");
/* harmony import */ var _services_LoggerService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/LoggerService */ "./services/LoggerService.ts");
/* harmony import */ var _services_GradeService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/GradeService */ "./services/GradeService.ts");
/* harmony import */ var _model_Grade__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../model/Grade */ "./model/Grade.ts");
/* harmony import */ var _services_CalendarService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/CalendarService */ "./services/CalendarService.ts");
/* harmony import */ var _services_TeacherService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/TeacherService */ "./services/TeacherService.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ScoresComponent = /** @class */ (function () {
    function ScoresComponent(_authService, _calendarService, _gradeService, _teacherService, _loggerService) {
        this._authService = _authService;
        this._calendarService = _calendarService;
        this._gradeService = _gradeService;
        this._teacherService = _teacherService;
        this._loggerService = _loggerService;
        this.Terms = new Array();
    }
    ScoresComponent.prototype.ngOnInit = function () {
        this.isLoggedOn = this._authService.getIsLoggedOn();
        if (this.isLoggedOn == false) {
            window.location.href = "/logon/login";
            return;
        }
        if (!this._authService.hasAccess("TermScores")) {
            // TODO: navigate to unauthorized page
            this._loggerService.log("Unauthorized access");
            //window.location.href = "/error";
        }
        this._loggerService.log("Access is authorized");
        this.isSelectTermLoading = false;
        this.termLoadError = "";
        this.isSelectGradeLoading = false;
        this.gradeLoadError = "";
        this.isSelectTeacherLoading = false;
        this.teacherLoadError = "";
        this.selectedTermWeekId = 0;
        this.selectedGrade = "0";
        this.selectedTeacherId = 0;
        this.isStudentTermScoreGridLoading = false;
        this.studentGridServerErrorMessage = "";
        this.selectGradeEnabled = true;
        this.selectTeachedEnabled = true;
        this.studentGridServerSuccessMessage = "";
        this.isStudentTermScoreGridSaving = false;
        this.showStudentTestScoreGrid = false;
        this.studentTermScoreDataFreeze = false;
        this.studentTermScoreEntryAllowed = true;
        this.populateTerms();
        if (this._authService.hasAccess("TermScores.GradeSelection")) {
            this.populateGrades();
        }
        else {
            this.populateGradeAndTeacherDetails();
        }
    };
    ScoresComponent.prototype.onSelectTerm = function (value) {
        this.selectedTermWeekId = value;
        if (this._authService.hasAccess("TermScores.GradeSelection")) {
            this.selectedGrade = "0";
            this.selectedTeacherId = 0;
            this.Teachers = null;
        }
        else {
            this.populateGradeAndTeacherDetails();
        }
        this.populateStudentTermScoresGrid();
    };
    ScoresComponent.prototype.onSelectGrade = function (value) {
        this.selectedGrade = value;
        if (this._authService.hasAccess("TermScores.TeacherSelection")) {
            if (this.selectedGrade != "0" && this.selectedTermWeekId != 0) {
                this.populateTeachers();
            }
        }
    };
    ScoresComponent.prototype.onSelectTeacher = function (value) {
        this.selectedTeacherId = value;
        if (this.selectedTeacherId != 0) {
            this.populateStudentTermScoresGrid();
        }
    };
    ScoresComponent.prototype.populateTerms = function () {
        var _this = this;
        this.isSelectTermLoading = true;
        this.termLoadError = "";
        this._calendarService.getCalendarTestWeeks()
            .subscribe(function (result) {
            _this.isSelectTermLoading = false;
            _this.CalendarWeeks = result;
        }, function (err) {
            _this.isSelectTermLoading = false;
            _this._loggerService.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
            if (err.status == "404") {
                // data not found
                _this.CalendarWeeks = null;
            }
            _this.termLoadError = "Error Occured";
        });
    };
    ScoresComponent.prototype.populateGrades = function () {
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
    ScoresComponent.prototype.populateTeachers = function () {
        var _this = this;
        this.isSelectTeacherLoading = true;
        this.teacherLoadError = "";
        this._teacherService.getAssignedTeacherByGradeAndWeek(this.selectedGrade, this.selectedTermWeekId)
            .subscribe(function (result) {
            _this.isSelectTeacherLoading = false;
            _this.Teachers = result;
        }, function (err) {
            _this.isSelectTeacherLoading = false;
            _this._loggerService.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
            if (err.status == "404") {
                // data not found
                _this.Teachers = null;
                _this.teacherLoadError = "Error Occured";
            }
        });
    };
    ScoresComponent.prototype.populateGradeAndTeacherDetails = function () {
        var _this = this;
        if (this.selectedTermWeekId != 0) {
            this._teacherService.getAssignedTeacherByWeek(this.selectedTermWeekId)
                .subscribe(function (result) {
                _this.isSelectTeacherLoading = false;
                _this.Teachers = result;
                //populate grade from result
                var gr = new Array();
                gr.push(new _model_Grade__WEBPACK_IMPORTED_MODULE_4__["Grade"](_this.Teachers[0].ctsGrade, _this.Teachers[0].ctsGrade));
                _this.Grades = gr;
                _this.selectedGrade = _this.Teachers[0].ctsGrade;
                _this.selectGradeEnabled = false;
                if (_this.Teachers.length > 1) {
                    _this.selectedTeacherId = 0;
                }
                else {
                    _this.selectedTeacherId = _this.Teachers[0].id;
                    _this.selectTeachedEnabled = false;
                    _this.populateStudentTermScoresGrid();
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
    ScoresComponent.prototype.populateStudentTermScoresGrid = function () {
        var _this = this;
        this.showStudentTestScoreGrid = false;
        if (this.selectedTermWeekId != 0 && this.selectedGrade != "0" && this.selectedTeacherId != 0) {
            this.isStudentTermScoreGridLoading = true;
            this.studentGridServerErrorMessage = "";
            this.studentGridServerWarningMessage = "";
            this.studentTermScoreDataFreeze = false;
            this.studentTermScoreEntryAllowed = true;
            console.log('selectedTermWeekId = ' + this.selectedTermWeekId);
            var cw = this.CalendarWeeks.find(function (x) { return x.id == _this.selectedTermWeekId; });
            var termNo = cw.termNo;
            console.log('termNo = ' + termNo);
            this._teacherService.getStudentTermScores(this.selectedTeacherId, termNo, this.selectedTermWeekId)
                .subscribe(function (result) {
                _this.isStudentTermScoreGridLoading = false;
                _this.StudentTermScores = result.studentTermScores;
                if (_this.StudentTermScores != null) {
                    _this.studentTermScoreDataFreeze = result.dataFreeze;
                    _this.studentTermScoreEntryAllowed = result.termScoreEntryAllowed;
                    _this.showStudentTestScoreGrid = true;
                    if (_this.studentTermScoreDataFreeze == true || _this.studentTermScoreEntryAllowed == false) {
                        _this.studentGridServerWarningMessage = "Term Score entry is not allowed !";
                    }
                }
                else {
                    _this.studentGridServerWarningMessage = "No attendance score found.";
                }
            }, function (err) {
                _this.isStudentTermScoreGridLoading = false;
                _this._loggerService.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
                if (err.status == "404") {
                    // data not found
                    _this.StudentTermScores = null;
                }
                _this.studentGridServerErrorMessage = "Error Occured while retrieving information : " + err.statusText;
            });
        }
    };
    ScoresComponent.prototype.cancelClick = function () {
        this.showStudentTestScoreGrid = false;
        this.studentGridServerSuccessMessage = "";
        this.studentGridServerErrorMessage = "";
        this.studentGridServerWarningMessage = "";
        this.StudentTermScores = null;
        this.selectedTeacherId = 0;
    };
    ScoresComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./scores.html */ "./components/score/scores.html")
        }),
        __metadata("design:paramtypes", [_services_AuthService__WEBPACK_IMPORTED_MODULE_1__["AuthService"],
            _services_CalendarService__WEBPACK_IMPORTED_MODULE_5__["CalendarService"],
            _services_GradeService__WEBPACK_IMPORTED_MODULE_3__["GradeService"],
            _services_TeacherService__WEBPACK_IMPORTED_MODULE_6__["TeacherService"],
            _services_LoggerService__WEBPACK_IMPORTED_MODULE_2__["LoggerService"]])
    ], ScoresComponent);
    return ScoresComponent;
}());



/***/ }),

/***/ "./components/score/scores.html":
/*!*************************************************!*\
  !*** ../clientapp/components/score/scores.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header class=\"container-fluid p0\">\r\n    <nav class=\"navbar navbar-light navbar-expand-md bgcolorMenu\">\r\n        <div class=\"row \">\r\n            <button class=\"navbar-toggler\" data-toggle=\"collapse\" data-target=\"#menuBar\">\r\n                <span class=\"navbar-toggler-icon\"></span>\r\n            </button>\r\n            <div id=\"menuBar\" class=\"navbar-collapse collapse\">\r\n                <ul class=\"navbar-nav\">\r\n                    <li class=\"nav-item\"><a class=\"nav-link py-0\" routerLink=\"/home\">Home</a></li>\r\n                    <li *ngIf=\"isLoggedOn\" class=\"nav-item\"><a class=\"nav-link py-0\" routerLink=\"/attendance\">Attendance</a></li>\r\n                    <li *ngIf=\"isLoggedOn\" class=\"nav-item active\"><a class=\"nav-link py-0\" routerLink=\"/scores\">Term Scores</a></li>\r\n                    <!--<li class=\"nav-item\"><a class=\"nav-link py-0\" routerLink=\"/contactus\">Contact Us</a></li>\r\n    <li class=\"nav-item\"><a class=\"nav-link py-0\">About Us</a></li>-->\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </nav>\r\n\r\n</header>\r\n<div class=\"container p0 mt10\">\r\n    <!--<h4 class=\"text-center\">{{pageTitle}}</h4>-->\r\n\r\n    <div class=\"row bgBar br5 m5 p5\">\r\n        <div class=\"col-md-4\">\r\n            <div class=\"input-group\">\r\n                <label for=\"selectTerm\" class=\"mt5\">Term</label>\r\n                <img *ngIf=\"isSelectTermLoading\" src=\"/img/Loading.gif\" height=\"40\" width=\"40\" class=\"ml10\" />\r\n                <i *ngIf=\"termLoadError\" class=\"fa fa-exclamation-triangle form-control errorText\"> {{termLoadError}}</i>\r\n                <select *ngIf=\"!isSelectTermLoading && !termLoadError\" name=\"selectTerm\" class=\"ml10 selectpicker form-control selectWidth\" (change)=\"onSelectTerm($event.target.value)\">\r\n                    <option value=\"0\">--Select Term--</option>\r\n                    <option *ngFor=\"let week of CalendarWeeks\" value={{week.id}}>\r\n                        {{week.description}}\r\n                    </option>\r\n                </select>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-4\">\r\n            <div class=\"input-group\">\r\n                <label for=\"selectGrade\" class=\"mt5\">Grade</label>\r\n                <img *ngIf=\"isSelectGradeLoading\" src=\"/img/Loading.gif\" height=\"40\" width=\"40\" class=\"ml10\" />\r\n                <i *ngIf=\"gradeLoadError\" class=\"fa fa-exclamation-triangle form-control errorText\"> {{gradeLoadError}}</i>\r\n                <select *ngIf=\"!isSelectGradeLoading && !gradeLoadError\" name=\"selectGrade\" class=\"ml10 selectpicker form-control selectWidth\"\r\n                        (change)=\"onSelectGrade($event.target.value)\" [(ngModel)]=\"selectedGrade\" [disabled]=\"!selectGradeEnabled\">\r\n                    <option value=\"0\">--Select Grade--</option>\r\n                    <option *ngFor=\"let grade of Grades\" value={{grade.ctsGrade}}>\r\n                        {{grade.ctsGrade}}\r\n                    </option>\r\n                </select>\r\n            </div>\r\n\r\n        </div>\r\n        <div class=\"col-md-4\">\r\n            <div class=\"input-group\">\r\n                <label for=\"selectTeacher\" class=\"mt5\">Teacher</label>\r\n                <img *ngIf=\"isSelectTeacherLoading\" src=\"/img/Loading.gif\" height=\"40\" width=\"40\" class=\"ml10\" />\r\n                <i *ngIf=\"teacherLoadError\" class=\"fa fa-exclamation-triangle form-control errorText\"> {{teacherLoadError}}</i>\r\n                <select *ngIf=\"!isSelectTeacherLoading && !teacherLoadError\" name=\"selectTeacher\" class=\"ml10 selectpicker form-control selectWidth\"\r\n                        (change)=\"onSelectTeacher($event.target.value)\" [(ngModel)]=\"selectedTeacherId\" [disabled]=\"!selectTeachedEnabled\">\r\n                    <option value=\"0\">--Select Teacher--</option>\r\n                    <option *ngFor=\"let teacher of Teachers\" value={{teacher.id}}>\r\n                        {{teacher.firstName}} {{teacher.lastName}}\r\n                    </option>\r\n                </select>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"row\">\r\n        <div *ngIf=\"isStudentTermScoreGridLoading\" class=\"col-md-12\">Loading Student Term Scores. Please wait.<img src=\"/img/Loading.gif\" height=\"40\" width=\"40\" class=\"ml10\" /></div>\r\n        <div *ngIf=\"studentGridServerWarningMessage\" class=\"col-md-12 mt10 ml10 errorText\"><i class=\"fa fa-exclamation-triangle\"></i> {{studentGridServerWarningMessage}} </div>\r\n    </div>\r\n\r\n    <div class=\"row\" *ngIf=\"showStudentTestScoreGrid\">\r\n        <div class=\"col-md-12\" id=\"no-more-tables\">\r\n            <table class=\"table-bordered table-condensed cf\" id=\"dev-table\">\r\n                <thead class=\"bgTableHead cf\">\r\n                    <tr>\r\n                        <th class=\"fw\">ID</th>\r\n                        <th class=\"fw w150\">First Name</th>\r\n                        <th class=\"fw w150\">Last Name</th>\r\n                        <th class=\"fw\">Attendance</th>\r\n                        <th class=\"fw\">Homework</th>\r\n                        <th class=\"fw\">Reading</th>\r\n                        <th class=\"fw\">Writing</th>\r\n                        <th class=\"fw\">Speaking</th>\r\n                        <th class=\"fw\">Behaviour</th>\r\n                        <th class=\"fw\">Quiz</th>\r\n                        <th class=\"fw\">Internal</th>\r\n                        <th class=\"fw w60\">Term Score</th>\r\n                        <th class=\"fw\">Total Score</th>\r\n                        <th class=\"fw w200\">Notes</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr *ngFor=\"let testScore of StudentTermScores\">\r\n                        <td data-title=\"ID\">{{testScore.studentID}}</td>\r\n                        <td data-title=\"First Name\">{{testScore.firstName}}</td>\r\n                        <td data-title=\"Last Name\">{{testScore.lastName}}</td>\r\n                        <td data-title=\"Attendance\">{{testScore.attendance}}</td>\r\n                        <td data-title=\"Homework\">{{testScore.homework}}</td>\r\n                        <td data-title=\"Reading\">{{testScore.reading}}</td>\r\n                        <td data-title=\"Writing\">{{testScore.writing}}</td>\r\n                        <td data-title=\"Speaking\">{{testScore.speaking}}</td>\r\n                        <td data-title=\"Behavior\">{{testScore.behavior}}</td>\r\n                        <td data-title=\"Quiz\">{{testScore.quiz}}</td>\r\n                        <td data-title=\"Internal\">{{testScore.internalScore}}</td>\r\n                        <td data-title=\"Score\">\r\n                            <input class=\"form-control\" [(ngModel)]=\"testScore.termScore\" value=\"{{testScore.termScore}}\" *ngIf=\"studentTermScoreEntryAllowed\" maxlength=\"3\" />\r\n                            <span *ngIf=\"!studentTermScoreEntryAllowed\">{{testScore.termScore}}</span>\r\n                        </td>\r\n                        <td data-title=\"Total Score\">{{(testScore.internalScore-0) + ((testScore.termScore-0)/2)}}</td>\r\n                        <td data-title=\"Notes\">\r\n                            <textarea class=\"form-control rounded-3\" rows=\"1\" [(ngModel)]=\"testScore.notes\" maxlength=\"100\" *ngIf=\"studentTermScoreEntryAllowed\">{{testScore.notes}}</textarea>\r\n                            <span *ngIf=\"!studentTermScoreEntryAllowed\">{{testScore.notes}}</span>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div *ngIf=\"studentGridServerErrorMessage\" class=\"col-md-12 mt10 ml10 errorText\"><i class=\"fa fa-exclamation-triangle\"></i> {{studentGridServerErrorMessage}} </div>\r\n        <div *ngIf=\"studentGridServerSuccessMessage\" class=\"col-md-12 mt10 ml10 successText\"><i class=\"fa fa-check-circle\"></i>  {{studentGridServerSuccessMessage}}</div>\r\n    </div>\r\n    <div class=\"row bgBar br5 m5 p5\" *ngIf=\"isStudentTermScoreGridSaving\">\r\n        <div class=\"col-md-12\">Saving Student Term Scores. Please wait.<img src=\"/img/Loading.gif\" height=\"40\" width=\"40\" class=\"ml10\" /></div>\r\n    </div>\r\n    <div class=\"row bgBar br5 m5 p5\" *ngIf=\"!isStudentTermScoreGridSaving && showStudentTestScoreGrid\">\r\n\r\n        <div class=\"col-md-4\"></div>\r\n        <div class=\"col-md-4 \">\r\n            <button class=\"btn btn-primary btn-sm\" type=\"button\" (click)=\"cancelClick()\"><strong><i class=\"fa fa-times-circle\"></i> Cancel</strong></button>\r\n            <button class=\"btn btn-primary btn-sm ml10\" type=\"submit\" *ngIf=\"studentTermScoreEntryAllowed\"><strong><i class=\"fa fa-save\"></i> Save</strong></button>\r\n        </div>\r\n        <div class=\"col-md-4\"></div>\r\n    </div>\r\n</div>\r\n\r\n"

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

/***/ "./interceps/AuthInterceptor.ts":
/*!*************************************************!*\
  !*** ../clientapp/interceps/AuthInterceptor.ts ***!
  \*************************************************/
/*! exports provided: AuthInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthInterceptor", function() { return AuthInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "../node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _services_AuthService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/AuthService */ "./services/AuthService.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor(_authService) {
        this._authService = _authService;
    }
    AuthInterceptor.prototype.intercept = function (req, next) {
        var authHeader = 'Bearer ' + this._authService.getAuthToken();
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
            'Authorization': authHeader
        });
        var authReq = req.clone({ headers: headers });
        return next.handle(authReq);
    };
    AuthInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_services_AuthService__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], AuthInterceptor);
    return AuthInterceptor;
}());



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

/***/ "./model/Grade.ts":
/*!***********************************!*\
  !*** ../clientapp/model/Grade.ts ***!
  \***********************************/
/*! exports provided: Grade */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Grade", function() { return Grade; });
var Grade = /** @class */ (function () {
    function Grade(ctsGrade, countyGrade) {
        this.ctsGrade = ctsGrade;
        this.countyGrade = countyGrade;
    }
    return Grade;
}());



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
/* harmony import */ var _components_score_Scores__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/score/Scores */ "./components/score/Scores.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AppRoutes = [
    { path: "", redirectTo: 'home', pathMatch: 'full' },
    { path: "attendance", component: _components_attendance_Attendance__WEBPACK_IMPORTED_MODULE_3__["AttendanceComponent"] },
    { path: "home", component: _components_home_Home__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"] },
    { path: "scores", component: _components_score_Scores__WEBPACK_IMPORTED_MODULE_4__["ScoresComponent"] }
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
/* harmony import */ var _LoggerService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LoggerService */ "./services/LoggerService.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "../node_modules/@angular/common/fesm5/http.js");
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
    function AuthService(_loggerService, _http) {
        this._loggerService = _loggerService;
        this._http = _http;
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
    AuthService.prototype.getIsLoggedOn = function () {
        if (this.authToken != null && this.authToken.length > 0 && this.expiresBy >= new Date()) {
            this._loggerService.log("getIsLoggedOn() = true");
            return true;
        }
        this._loggerService.log("getIsLoggedOn() = false");
        return false;
    };
    AuthService.prototype.setExpiresBy = function (expiresBy) {
        this.expiresBy = expiresBy;
    };
    AuthService.prototype.getExpiresBy = function () {
        return this.expiresBy;
    };
    AuthService.prototype.hasAccess = function (fnName) {
        var allowed = false;
        this.getAuthFunctions();
        if (this.authFunctions != null && this.authFunctions.functions != null && this.authFunctions.functions.length > 0) {
            var item = this.authFunctions.functions.find(function (x) { return x == fnName; });
            if (item != null) {
                allowed = true;
            }
        }
        return allowed;
    };
    AuthService.prototype.getAuthFunctions = function () {
        var _this = this;
        if (this.authFunctions == null) {
            this.callAuthFunctionsService()
                .subscribe(function (result) {
                //this._loggerService.log(JSON.stringify(result));
                _this.authFunctions = result;
            }, function (err) {
                _this._loggerService.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
                // Redirect to error page
            });
        }
    };
    AuthService.prototype.callAuthFunctionsService = function () {
        return this._http.get('/api/ctsuser/authfunctions');
    };
    var AuthService_1;
    AuthService = AuthService_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_LoggerService__WEBPACK_IMPORTED_MODULE_1__["LoggerService"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
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
    CalendarService.prototype.getCalendarWeeks = function () {
        return this._http.get('/api/calendar/weeks');
    };
    CalendarService.prototype.getCalendarTestWeeks = function () {
        return this._http.get('/api/calendar/testweeks');
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
    LoggerService.prototype.log = function (message) {
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

/***/ "./services/StudentService.ts":
/*!***********************************************!*\
  !*** ../clientapp/services/StudentService.ts ***!
  \***********************************************/
/*! exports provided: StudentService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StudentService", function() { return StudentService; });
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


var StudentService = /** @class */ (function () {
    function StudentService(_http) {
        this._http = _http;
    }
    StudentService.prototype.saveStudentWeekGrades = function (studentWeekGrades) {
        return this._http.post('/api/student/savestudentweekgrades', studentWeekGrades);
    };
    StudentService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], StudentService);
    return StudentService;
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
    TeacherService.prototype.getAssignedTeacherByGradeAndWeek = function (grade, weekId) {
        return this._http.get('/api/Teacher/assignment/' + grade + '/' + weekId);
    };
    TeacherService.prototype.getAssignedTeacherByWeek = function (weekId) {
        return this._http.get('/api/Teacher/assignmentByWeekId/' + weekId);
    };
    TeacherService.prototype.getStudentWeekGrades = function (teacherId, weekId) {
        return this._http.get('/api/Teacher/assignmentById/' + teacherId + '/studentgrades/' + weekId);
    };
    TeacherService.prototype.getStudentTermScores = function (teacherId, termNo, weekId) {
        return this._http.get('/api/Teacher/assignmentById/' + teacherId + '/studentscores/' + termNo + '/' + weekId);
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

module.exports = __webpack_require__(/*! C:\Data\Akila\code\CTSApp\CTSApp\CTSWebApp\clientapp\main.ts */"./main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map