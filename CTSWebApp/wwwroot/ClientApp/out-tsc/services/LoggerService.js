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
import { environment } from '../environments/environment';
var LoggerService = /** @class */ (function () {
    function LoggerService() {
        if (LoggerService_1.instance == null) {
            LoggerService_1.instance = this;
        }
        return LoggerService_1.instance;
    }
    LoggerService_1 = LoggerService;
    LoggerService.prototype.log = function (message) {
        if (!environment.production) {
            console.log(message);
        }
    };
    var LoggerService_1;
    LoggerService = LoggerService_1 = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], LoggerService);
    return LoggerService;
}());
export { LoggerService };
//# sourceMappingURL=LoggerService.js.map