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
import { HttpClient } from '@angular/common/http';
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
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], CalendarService);
    return CalendarService;
}());
export { CalendarService };
//# sourceMappingURL=CalendarService.js.map