import { Lesson } from './Lesson';
import { Users } from './Users';

export interface CourseRegistration {
    id: number;
    user: Users;
    lesson: Lesson;
    registeredAt: Date;
}
