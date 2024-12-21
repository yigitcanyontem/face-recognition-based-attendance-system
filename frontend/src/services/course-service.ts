import axios from 'axios';
import {GlobalConstants} from "../utils/GlobalConstants.ts";
import {CourseRegistration} from "../models/CourseRegistration.ts";

export class CourseRegistrationService {

    static baseUrl: string = GlobalConstants.baseUrl + 'course-registration';

    static registerUserToLesson(userId: number, lessonId: number): Promise<CourseRegistration> {
        return axios.post(`${this.baseUrl}/register`, null, {
            params: {
                userId,
                lessonId
            }
        })
        .then(response => response.data)
        .catch(error => {
            console.error('Error registering user to lesson:', error);
            throw error;
        });
    }
}
