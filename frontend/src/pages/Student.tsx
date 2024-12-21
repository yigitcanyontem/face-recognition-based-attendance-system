import React, {useEffect, useState} from 'react';
import {Label} from '@/components/ui/label';
import {UserCourseService} from "@/services/user-course-service.ts";
import {Lesson} from "@/models/Lesson.ts";
import {Card, CardContent, CardTitle} from "@/components/ui/card.tsx";
import {useNavigate} from "react-router-dom";

const Student = () => {
    const [courses, setCourses] = useState<any>([]);
    const [userId, setUserId] = useState<string | null>(null);
    let navigate = useNavigate()
    useEffect(() => {
        setUserId(sessionStorage.getItem('userId'));
        UserCourseService.getCoursesAndAttendances(parseInt(sessionStorage.getItem('userId') || '')).then(r => {
            setCourses(r);
        })
    }, []);

    const navigateToCourseDetail = (courseId: number) => () => {
        navigate(`/course/${courseId}`);
    };

    return (
        <div className={'common_container'}>
            <div className={"flex flex-col gap-10"}>
                <Label>My Lessons</Label>
                <div className="course-cards">
                    {courses.map((course: Lesson) => (
                        <Card key={course.id} className="course-card" onClick={navigateToCourseDetail(course.id)}>
                            <CardContent>
                                <CardTitle>{course.name}</CardTitle>
                                <p>{course.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Student;
