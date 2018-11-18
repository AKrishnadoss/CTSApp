﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Teacher } from '../model/Teacher';
import { StudentWeekGrade } from '../model/StudentWeekGrade';
import { StudentTermScore } from '../model/StudentTermScore';


@Injectable()
export class TeacherService {
    constructor(private _http:HttpClient) { }

    getAssignedTeacherByGradeAndWeek(grade : string, weekId : number){
        return this._http.get<Teacher[]>('/api/Teacher/assignment/' + grade + '/' + weekId);
    }

    getAssignedTeacherByWeek(weekId: number) {
        return this._http.get<Teacher[]>('/api/Teacher/assignmentByWeekId/' + weekId);
    }

	getStudentWeekGrades(teacherId : number, weekId : number){
        return this._http.get<StudentWeekGrade[]>('/api/Teacher/assignmentById/' + teacherId + '/studentgrades/' + weekId);
    }

    getStudentTermScores(teacherId: number, weekId: number) {
        return this._http.get<StudentTermScore[]>('/api/Teacher/assignmentById/' + teacherId + '/studentscores/' + weekId);
    }
}