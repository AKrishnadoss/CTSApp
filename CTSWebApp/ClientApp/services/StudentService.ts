import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { StudentWeekGrade } from '../model/StudentWeekGrade';


@Injectable()
export class StudentService {
    constructor(private _http:HttpClient) { }

	saveStudentWeekGrades(studentWeekGrades : StudentWeekGrade[]){
		return this._http.post('/api/student/savestudentweekgrades', studentWeekGrades);
	}
}