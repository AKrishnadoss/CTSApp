import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { StudentWeekGrade } from '../model/StudentWeekGrade';
import { StudentTermScore } from '../model/StudentTermScore';


@Injectable()
export class StudentService {
    constructor(private _http:HttpClient) { }

    saveStudentWeekGrades(gradeLevel : string, studentWeekGrades : StudentWeekGrade[]){
        let data = {
            gradeLevel : gradeLevel,
            studentWeekGradeViewModelList : studentWeekGrades
        }

		return this._http.post('/api/student/savestudentweekgrades', data);
    }

    saveStudentTestScores(gradeLevel: string, studentTermScores: StudentTermScore[]) {
        let data = {
            gradeLevel: gradeLevel,
            studentTermScoreViewModelList: studentTermScores
        }
        return this._http.post('/api/student/savestudenttermscores', data);
    }
}