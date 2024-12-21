import axios from 'axios';
import {GlobalConstants} from "../utils/GlobalConstants.ts";
import {CourseRegistration} from "../models/CourseRegistration.ts";
import {Lesson} from "../models/Lesson.ts";

export class UserCourseService {

    static baseUrl: string = GlobalConstants.baseUrl + 'user-courses';

    static getCoursesAndAttendances(userId: number): Promise<Lesson[]> {
        return axios.get(`${this.baseUrl}/${userId}/attendances`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching courses and attendances:', error);
                throw error;
            });
    }

    static getStudentsInCourse(lessonId: number): Promise<CourseRegistration[]> {
        return axios.get(`${this.baseUrl}/students/${lessonId}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching students in course:', error);
                throw error;
            });
    }
}
