import axios from 'axios';
import {GlobalConstants} from "../utils/GlobalConstants.ts";
import {LessonTime} from "../models/LessonTime.ts";

export class LessonTimeService {

    static baseUrl: string = GlobalConstants.baseUrl + 'lesson-times';

    static createLessonTime(lessonId: number, teacherId: number, startTime: string, endTime: string): Promise<LessonTime> {
        return axios.post(`${this.baseUrl}/create`, null, {
            params: {
                lessonId,
                teacherId,
                startTime,
                endTime
            }
        })
        .then(response => response.data)
        .catch(error => {
            console.error('Error creating lesson time:', error);
            throw error;
        });
    }

    static getLessonTime(id: any): Promise<LessonTime> {
        return axios.get(`${this.baseUrl}/`+id)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching lesson time:', error);
            throw error;
        });
    }

    static getLessonTimesByLessonId(lessonId: number): Promise<LessonTime[]> {
        return axios.get(`${this.baseUrl}/lesson/${lessonId}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching lesson times by lessonId:', error);
            throw error;
        });
    }
        static getTeacherLessons(teacherId: number): Promise<LessonTime[]> {
        return axios.get(`${this.baseUrl}/teacher/${teacherId}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching teacher lessons:', error);
            throw error;
        });
    }

}
