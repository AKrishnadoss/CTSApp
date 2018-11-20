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
import { LoggerService } from '../../services/LoggerService';
var HomeComponent = /** @class */ (function () {
    function HomeComponent(_authService, _loggerService, _router) {
        this._authService = _authService;
        this._loggerService = _loggerService;
        this._router = _router;
        this.pageTitle = 'Home Page';
        this.userName = '';
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoggedOn = this._authService.getIsLoggedOn();
        this.userName = this._authService.getUserName();
        if (this.isLoggedOn == false) {
            this.resetLoginControls();
        }
        else {
            if (this._authService.authFunctions == null) {
                this._loggerService.log("home ts - > getting authFunctions");
                this._authService.getAuthFunctions()
                    .subscribe(function (result) {
                    _this._authService.authFunctions = result;
                }, function (err) {
                    _this._loggerService.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
                });
            }
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
        Component({
            templateUrl: './home.html'
        }),
        __metadata("design:paramtypes", [AuthService,
            LoggerService,
            Router])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=Home.js.map