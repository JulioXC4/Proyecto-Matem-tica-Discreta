export interface Teacher {
    name: string;
    schedules: string[];
}
export interface Course {
    name: string;
    teachers: Teacher[];
}
