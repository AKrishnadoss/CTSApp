var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { LoggerService } from './LoggerService';
var AuthService = /** @class */ (function () {
    function AuthService(_loggerService) {
        this._loggerService = _loggerService;
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
    //setIsLoggedOn(isLoggedOn : boolean){
    //	this.isLoggedOn = isLoggedOn;
    //}
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
    AuthService = AuthService_1 = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [LoggerService])
    ], AuthService);
    return AuthService;
    var AuthService_1;
}());
export { AuthService };
//# sourceMappingURL=AuthService.js.map