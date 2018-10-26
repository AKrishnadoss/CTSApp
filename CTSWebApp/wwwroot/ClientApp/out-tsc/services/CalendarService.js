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
var CalendarService = /** @class */ (function () {
    function CalendarService() {
        this.CalendarWeeks = [
            { WeekNo: 1, Description: "08/26/2018" },
            { WeekNo: 2, Description: "09/09/2018" },
            { WeekNo: 3, Description: "09/16/2018" }
        ];
    }
    CalendarService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], CalendarService);
    return CalendarService;
}());
export { CalendarService };
//# sourceMappingURL=CalendarService.js.map