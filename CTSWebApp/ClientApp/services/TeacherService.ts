import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Teacher } from '../model/Teacher';
import { StudentWeekGrade } from '../model/StudentWeekGrade';
import { StudentTermScoreResult } from '../model/StudentTermScore';


@Injectable()
export class TeacherService {
    constructor(private _http:HttpClient) { }

    getAssignedTeacherByGradeAndWeek(grade : string, weekId : number){
        return this._http.get<Teacher[]>('/api/Teacher/assignment/' + grade + '/' + weekId);
    }

    getAssignedTeacherByWeek(weekId: number) {
        return this._http.get<Teacher[]>('/api/Teacher/assignmentByWeekId/' + weekId);
    }

    getWeekGrades(teacherId: number, gradeLevel : string, weekId: number) {
        return this._http.get<StudentWeekGrade[]>('/api/Teacher/assignmentById/' + teacherId + '/' + gradeLevel + '/studentgrades/' + weekId);
    }

    //getL2WeekGrades(teacherId : number, weekId : number){
    //    return this._http.get<StudentWeekGrade[]>('/api/Teacher/assignmentById/' + teacherId + '/studentgrades/' + weekId);
    //}

    //getL3WeekGrades(teacherId: number, weekId: number) {
    //    return this._http.get<StudentWeekGrade[]>('/api/Teacher/assignmentById/' + teacherId + '/studentgrades/' + weekId);
    //}

    getStudentTermScores(teacherId: number, gradeLevel : string, termNo: number, weekId: number) {
        return this._http.get<StudentTermScoreResult>('/api/Teacher/assignmentById/' + teacherId + '/' + gradeLevel + '/studentscores/' + termNo + '/' + weekId);
    }
}