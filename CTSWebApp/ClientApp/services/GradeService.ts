import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Grade } from '../model/Grade';


@Injectable()
export class GradeService {
    constructor(private _http: HttpClient) { }

    

    getGrades() {

        return this._http.get<Grade[]>('/api/grade/grades');
    }

    getScoringGrades() {
        return this._http.get<Grade[]>('/api/grade/scoringgrades');
    }
}