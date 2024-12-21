import React, {useEffect, useState} from 'react';
import {Label} from '@/components/ui/label';
import {Card, CardContent, CardDescription, CardTitle} from "@/components/ui/card.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {LessonTimeService} from "@/services/lesson-time-service.ts";
import {LessonTime} from "@/models/LessonTime.ts";
import {format} from 'date-fns';
import {Attendance} from "@/models/Attendance.ts"; // For date formatting

const Teacher = () => {
    const [times, setTimes] = useState<any>([]);
    const [userId, setUserId] = useState<string | null>(null);
    let navigate = useNavigate()
    const {id} = useParams();
    useEffect(() => {
        setUserId(sessionStorage.getItem('userId'));
        LessonTimeService.getTeacherLessons(parseInt(sessionStorage.getItem('userId') || '')).then(r => {
            setTimes(r);
        })
    }, []);

    const navigateToAttendance = (courseId: number) => () => {
        navigate(`/attendance/${courseId}`);
    };

    const isUserAttended = (lessonTime: LessonTime) => {
        return lessonTime.attendances.some((attendance: Attendance) => attendance.user.id.toString() === userId);
    };

    return (
        <div className={'common_container'}>
            <div className={"flex flex-col gap-10"}>
                <Label>My Lessons</Label>
                <div className="course-cards">
                    {times.map((lessonTime: LessonTime) => (
                        <Card
                            key={lessonTime.id}
                            className="course-card"
                            onClick={navigateToAttendance(lessonTime.id)}
                        >
                            <CardContent>
                                <CardTitle>{lessonTime.lesson.name}</CardTitle>
                                <CardDescription>
                                    <div><strong>Teacher:</strong> {lessonTime.teacher.username}</div>
                                    <div>
                                        <strong>Time:</strong> {`${format(new Date(lessonTime.startTime), 'h:mm a')} - ${format(new Date(lessonTime.endTime), 'h:mm a')}`}
                                    </div>
                                    <div><strong>Date:</strong> {format(new Date(lessonTime.date), 'MMMM dd, yyyy')}
                                    </div>

                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Teacher;
