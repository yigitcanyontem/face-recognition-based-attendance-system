import { Lesson } from './Lesson';
import { Users } from './Users';
import {Attendance} from "@/models/Attendance.ts";

export interface LessonTime {
    id: number;
    lesson: Lesson;
    startTime: Date;  // Use ISO string for date-time
    endTime: Date;    // Use ISO string for date-time
    date: Date;       // Use ISO date format
    teacher: Users;
    attendances: Attendance[];  // List of attendances
}
