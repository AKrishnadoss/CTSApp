export class StudentTermScoreResult {
    dataFreeze: boolean;
    termScoreEntryAllowed: boolean;
    studentTermScores : StudentTermScore[];
}

export class StudentTermScore {

    id: number;
    studentID: string;
    calendarWeekID: number;
    teacherID: number;
    firstName: string;
    lastName: string;
    attendance: number;
    homework: number;
    reading: number;
    writing: number;
    speaking: number;
    behavior: number;
    quiz: number;
    participation: number;
    notes: string;
    internalScore: number;
    termScore: number;
    termNo: number;
    dataFreeze: string;
}