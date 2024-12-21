import axios from 'axios';
import {GlobalConstants} from "../utils/GlobalConstants.ts";
import {Lesson} from "../models/Lesson.ts";
import {CourseRegistration} from "../models/CourseRegistration.ts";

export class LessonService {

    static baseUrl: string = GlobalConstants.baseUrl + 'lessons';

    static createLesson(name: string, description: string): Promise<Lesson> {
        return axios.post(`${this.baseUrl}/create`, null, {
            params: {
                name,
                description
            }
        })
        .then(response => response.data)
        .catch(error => {
            console.error('Error creating lesson:', error);
            throw error;
        });
    }

    static registerUserToLesson(userId: number, lessonId: number): Promise<CourseRegistration> {
        return axios.post(`${this.baseUrl}/${lessonId}/register/${userId}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error registering user to lesson:', error);
                throw error;
            });
    }

}
