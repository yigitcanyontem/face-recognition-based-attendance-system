import { AttendanceStatus } from './AttendanceStatus';
import { LessonTime } from './LessonTime';
import { Users } from './Users';

export interface Attendance {
    id: number;
    user: Users;
    lesson: LessonTime;
    status: AttendanceStatus;
    recordedAt: Date;
}
