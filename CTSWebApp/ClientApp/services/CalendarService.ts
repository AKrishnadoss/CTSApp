import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CalendarWeek } from '../model/CalendarWeek';


@Injectable()
export class CalendarService {
    constructor(private _http:HttpClient) { }


    getCalendarWeeks(){
        return this._http.get<CalendarWeek[]>('/api/calendar/weeks');
    }
}