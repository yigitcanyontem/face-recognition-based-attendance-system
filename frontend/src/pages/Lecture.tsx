import React, {useEffect, useState} from 'react';
import {Label} from '@/components/ui/label';
import {Card, CardContent, CardDescription, CardTitle} from "@/components/ui/card.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {LessonTimeService} from "@/services/lesson-time-service.ts";
import {LessonTime} from "@/models/LessonTime.ts";
import {format} from 'date-fns';
import {Attendance} from "@/models/Attendance.ts"; // For date formatting

const Lecture = () => {
    const [times, setTimes] = useState<LessonTime>();
    const {id} = useParams();
    useEffect(() => {
        LessonTimeService.getLessonTime(id).then(r => {
            setTimes(r);
        })
    }, [id]);


    return (
        <div className={'common_container'}>
            <div className={"flex flex-col gap-10"}>
                <Label>My Lessons</Label>
                <div className="course-cards">
                    {times && times.attendances.map((attendance: Attendance) => (
                        <Card
                            key={attendance.id}
                            className="course-card"
                        >
                            <CardContent>
                                <CardTitle>{attendance.user.username}</CardTitle>
                                <CardDescription>
                                    <div><strong>Status:</strong> {attendance.status}</div>
                                    <div>
                                        <strong>Time:</strong> {`${format(new Date(attendance.recordedAt), 'h:mm a')} `}
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

export default Lecture;
