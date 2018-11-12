import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../services/AuthService';
import { Observable } from 'rxjs';
import { Term } from '../../model/Term';
import { LoggerService } from '../../services/LoggerService';
import { GradeService } from '../../services/GradeService';
import { Grade } from '../../model/Grade';

@Component({
    templateUrl: './scores.html'
})
export class ScoresComponent implements OnInit {
    isLoggedOn: boolean;

    //Terms: Term[];
    Terms: Array<Term> = new Array<Term>();
    selectedTerm: number;
    selectedGrade: string;
    Grades: Grade[];

    gradeLoadError: string;
    isSelectGradeLoading: boolean;

    constructor(private _authService: AuthService,
        private _gradeService: GradeService,
        private _loggerService: LoggerService) {

    }

    ngOnInit() {
        this.isLoggedOn = this._authService.getIsLoggedOn();
        if (this.isLoggedOn == false) {
            window.location.href = "/logon/login";
            return;
        }

        this.populateTerms();
        this.populateGrades();

    }


    onSelectTerm(value: any) {
        this.selectedTerm = value;
    }

    onSelectGrade(value: any) {
        this.selectedGrade = value;
    }


    populateTerms() {
        this.Terms.push(new Term(1, "Term 1"));
        this.Terms.push(new Term(2, "Term 2"));
        this.Terms.push(new Term(3, "Term 3"));
    }


    populateGrades() {
        this.isSelectGradeLoading = true;
        this.gradeLoadError = "";
        this._gradeService.getGrades()
            .subscribe(result => {
                this.isSelectGradeLoading = false;
                this.Grades = result;
            },
                err => {
                    this.isSelectGradeLoading = false;
                    this._loggerService.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
                    if (err.status == "404") {
                        // data not found
                        this.Grades = null;
                    }
                    this.gradeLoadError = "Error Occured";
                });
    }

}
