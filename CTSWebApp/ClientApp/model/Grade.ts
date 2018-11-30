export class Grade {


    ctsGrade: string;
    countyGrade: string;
    gradeLevel : string;

    constructor(ctsGrade: string, countyGrade: string, gradeLevel:string) {
        this.ctsGrade = ctsGrade;
        this.countyGrade = countyGrade;
        this.gradeLevel = gradeLevel;
    }
}