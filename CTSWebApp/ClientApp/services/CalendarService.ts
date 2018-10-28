import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CalendarWeek } from '../model/CalendarWeek';


@Injectable()
export class CalendarService {
    constructor(private _http:HttpClient) { }

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


    getCalendarWeeks(){
        //this.weeks[0].WeekDate = new Date(2018, 08, 26);
        //this.weeks[1].WeekDate = new Date(2018, 09, 09);

        //return this.weeks;
        return this._http.get<CalendarWeek[]>('/api/calendar/weeks');
    }
}