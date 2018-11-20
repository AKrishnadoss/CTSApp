import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { StudentWeekGrade } from '../model/StudentWeekGrade';
import { StudentTermScore } from '../model/StudentTermScore';


@Injectable()
export class StudentService {
    constructor(private _http:HttpClient) { }

	saveStudentWeekGrades(studentWeekGrades : StudentWeekGrade[]){
		return this._http.post('/api/student/savestudentweekgrades', studentWeekGrades);
    }

    saveStudentTestScores(studentTermScores: StudentTermScore[]) {
        return this._http.post('/api/student/savestudenttermscores', studentTermScores);
    }
}