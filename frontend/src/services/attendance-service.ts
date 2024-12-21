import axios from 'axios';
import {GlobalConstants} from "../utils/GlobalConstants.ts";
import {Attendance} from "../models/Attendance.ts";
import {AttendanceStatus} from "../models/AttendanceStatus.ts";

export class AttendanceService {

    static baseUrl: string = GlobalConstants.baseUrl + 'attendance';

    static saveAttendance(username: string, lessonTimeId: number, status: AttendanceStatus): Promise<Attendance> {
        return axios.post(`${this.baseUrl}/save`, null, {
            params: {
                username,
                lessonTimeId,
                status
            }
        })
        .then(response => response.data)
        .catch(error => {
            console.error('Error saving attendance:', error);
            throw error;
        });
    }

    static getAttendanceByLessonAndDate(lessonId: number, date: string): Promise<Attendance[]> {
        return axios.get(`${this.baseUrl}/lesson`, {
            params: {
                lessonId,
                date
            }
        })
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching attendance:', error);
            throw error;
        });
    }
}
