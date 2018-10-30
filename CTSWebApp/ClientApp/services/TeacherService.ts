import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Teacher } from '../model/Teacher';


@Injectable()
export class TeacherService {
    constructor(private _http:HttpClient) { }

    getTeachersByGrade(grade : string){
        return this._http.get<Teacher[]>('/api/Teacher/teacherbygrade/' + grade);
    }
}