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
/* harmony import */ var _services_LoggerService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/LoggerService */ "./services/LoggerService.ts");
/* harmony import */ var _services_AuthService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/AuthService */ "./services/AuthService.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./app/app.component.ts");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../routes */ "./routes.ts");
/* harmony import */ var _components_home_Home__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/home/Home */ "./components/home/Home.ts");
/* harmony import */ var _components_contact_Contact__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/contact/Contact */ "./components/contact/Contact.ts");
/* harmony import */ var _components_attendance_Attendance__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/attendance/Attendance */ "./components/attendance/Attendance.ts");
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
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _components_home_Home__WEBPACK_IMPORTED_MODULE_6__["HomeComponent"],
                _components_attendance_Attendance__WEBPACK_IMPORTED_MODULE_8__["AttendanceComponent"],
                _components_contact_Contact__WEBPACK_IMPORTED_MODULE_7__["ContactComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _routes__WEBPACK_IMPORTED_MODULE_5__["AppRoutingModule"]
            ],
            providers: [_services_AuthService__WEBPACK_IMPORTED_MODULE_3__["AuthService"], _services_LoggerService__WEBPACK_IMPORTED_MODULE_2__["LoggerService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
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
    function AttendanceComponent(_authService) {
        this._authService = _authService;
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
    };
    AttendanceComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./attendance.html */ "./components/attendance/attendance.html")
        }),
        __metadata("design:paramtypes", [_services_AuthService__WEBPACK_IMPORTED_MODULE_1__["AuthService"]])
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

module.exports = "<header class=\"container-fluid p0\">\r\n    <nav class=\"navbar navbar-light navbar-expand-md bgcolorMenu\">\r\n        <div class=\"row \">\r\n            <button class=\"navbar-toggler\" data-toggle=\"collapse\" data-target=\"#menuBar\">\r\n                <span class=\"navbar-toggler-icon\"></span>\r\n            </button>\r\n            <div id=\"menuBar\" class=\"navbar-collapse collapse\">\r\n                <ul class=\"navbar-nav\">\r\n                    <li class=\"nav-item\"><a class=\"nav-link py-0\" routerLink=\"/home\">Home</a></li>\r\n                    <li *ngIf=\"isLoggedOn\" class=\"nav-item\"><a class=\"nav-link py-0\" routerLink=\"/attendance\">Attendance</a></li>\r\n                    <li class=\"nav-item\"><a class=\"nav-link py-0\" routerLink=\"/contactus\">Contact Us</a></li>\r\n                    <li class=\"nav-item\"><a class=\"nav-link py-0\">About Us</a></li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </nav>\r\n</header>\r\n<div class=\"container-fluid p0\">\r\n    <h4 class=\"text-center\">{{pageTitle}}</h4>\r\n    <h3 *ngIf=\"isLoggedOn\">Welcome {{userName}}</h3>\r\n</div>"

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

module.exports = "<header class=\"container-fluid p0\">\r\n    <nav class=\"navbar navbar-light navbar-expand-md bgcolorMenu\">\r\n        <div class=\"row \">\r\n            <button class=\"navbar-toggler\" data-toggle=\"collapse\" data-target=\"#menuBar\">\r\n                <span class=\"navbar-toggler-icon\"></span>\r\n            </button>\r\n            <div id=\"menuBar\" class=\"navbar-collapse collapse\">\r\n                <ul class=\"navbar-nav\">\r\n                    <li class=\"nav-item\"><a class=\"nav-link py-0\" routerLink=\"/home\">Home</a></li>\r\n                    <li *ngIf=\"isLoggedOn\" class=\"nav-item\"><a class=\"nav-link py-0\" routerLink=\"/attendance\">Attendance</a></li>\r\n                    <li class=\"nav-item\"><a class=\"nav-link py-0\" routerLink=\"/contactus\">Contact Us</a></li>\r\n                    <li class=\"nav-item\"><a class=\"nav-link py-0\">About Us</a></li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </nav>\r\n</header>\r\n<div class=\"container-fluid p0\">\r\n    <h4 class=\"text-center\">{{pageTitle}}</h4>\r\n    <div class=\"col-md-6 offset-md-3\">\r\n        <div class=\"card card-body bg-light\">\r\n            <div class=\"form-group\">\r\n                <label for=\"UserName\">Name:</label>\r\n                <input id=\"UserName\" name=\"UserName\" type=\"text\" class=\"form-control\" />\r\n                <span id=\"errorUserName\" class=\"text-danger\"></span>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label for=\"UserEmail\">Email:</label>\r\n                <input id=\"UserEmail\" name=\"UserEmail\" type=\"email\" class=\"form-control\" />\r\n                <span id=\"errorUserEmail\" class=\"text-danger\"></span>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label for=\"Subject\">Phone:</label>\r\n                <input id=\"Phone\" name=\"Phone\" type=\"text\" class=\"form-control\" />\r\n                <span id=\"Phone\" class=\"text-danger\"></span>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label for=\"Subject\">Subject:</label>\r\n                <input id=\"Subject\" name=\"Subject\" type=\"text\" class=\"form-control\" />\r\n                <span id=\"Subject\" class=\"text-danger\"></span>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label for=\"Message\">Message:</label>\r\n                <textarea id=\"Message\" name=\"Message\" class=\"form-control\"></textarea>\r\n                <span id=\"Message\" class=\"text-danger\"></span>\r\n            </div>\r\n            <div class=\"form-group\">\r\n\r\n                <button type=\"submit\" class=\"btn btn-primary btn-sm\"><i class=\"fa fa-envelope\"> </i> Send Message</button>\r\n                <div class=\"text-success\"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

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

module.exports = "<header class=\"container-fluid p0\">\r\n    <nav class=\"navbar navbar-light navbar-expand-md bgcolorMenu\">\r\n        <div class=\"row \">\r\n            <button class=\"navbar-toggler\" data-toggle=\"collapse\" data-target=\"#menuBar\">\r\n                <span class=\"navbar-toggler-icon\"></span>\r\n            </button>\r\n            <div id=\"menuBar\" class=\"navbar-collapse collapse\">\r\n                <ul class=\"navbar-nav\">\r\n                    <li class=\"nav-item\"><a class=\"nav-link py-0\" routerLink=\"/home\">Home</a></li>\r\n                    <li *ngIf=\"isLoggedOn\" class=\"nav-item\"><a class=\"nav-link py-0\" routerLink=\"/attendance\">Attendance</a></li>\r\n                    <li class=\"nav-item\"><a class=\"nav-link py-0\" routerLink=\"/contactus\">Contact Us</a></li>\r\n                    <li class=\"nav-item\"><a class=\"nav-link py-0\">About Us</a></li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </nav>\r\n</header>\r\n<div class=\"container-fluid p0\">\r\n    <h2 class=\"text-center\">{{pageTitle}}</h2>\r\n    <h3 *ngIf=\"isLoggedOn\">Welcome {{userName}}</h3>\r\n</div>\r\n"

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
/* harmony import */ var _components_contact_Contact__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/contact/Contact */ "./components/contact/Contact.ts");
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
    { path: "contactus", component: _components_contact_Contact__WEBPACK_IMPORTED_MODULE_4__["ContactComponent"] }
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