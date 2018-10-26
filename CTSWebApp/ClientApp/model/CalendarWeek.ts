export class CalendarWeek {

    constructor(id:number, calendarYearId :number, weekNo :number, description :string, termNo : number) {
        this.Id = id;
        this.CalendarYearId = calendarYearId;
        this.WeekNo = weekNo;
        this.Description = description;
        this.TermNo = termNo;
    }

    Id: number;
    CalendarYearId: number;
    WeekNo: number;
    Description: string;
    //WeekDate: any;
    TermNo: number;
}