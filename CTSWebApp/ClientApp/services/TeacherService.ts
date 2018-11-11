import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Teacher } from '../model/Teacher';
import { StudentWeekGrade } from '../model/StudentWeekGrade';


@Injectable()
export class TeacherService {
    constructor(private _http:HttpClient) { }

    getTeachersByGrade(grade : string, weekId : number){
        return this._http.get<Teacher[]>('/api/Teacher/teacherbygrade/' + grade + '/' + weekId);
    }

	getStudentWeekGrades(teacherId : number, weekId : number){
		return this._http.get<StudentWeekGrade[]>('/api/Teacher/teacherbyid/' + teacherId + '/studentgrades/' + weekId);
	}
}