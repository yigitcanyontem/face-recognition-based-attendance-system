import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import {AttendanceService} from "@/services/attendance-service.ts";
import {AttendanceStatus} from "@/models/AttendanceStatus.ts";
import {useParams} from "react-router-dom";
import {LessonTime} from "@/models/LessonTime.ts";
import {LessonTimeService} from "@/services/lesson-time-service.ts";
import {Button} from "@/components/ui/button.tsx";
import {UserCourseService} from "@/services/user-course-service.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Label} from "@/components/ui/label.tsx";

const Face = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const webcamRef = useRef(null);
    const [times, setTimes] = useState<LessonTime>();
    const [students, setStudents] = useState<any>([]);
    const {id} = useParams();
    const [attended, setAttended] = useState<any>([]);
    useEffect(() => {
        LessonTimeService.getLessonTime(id).then(r => {
            setTimes(r);

            UserCourseService.getStudentsInCourse(parseInt(id)).then(res => {
                let attendees = r.attendances.map((attendance: any) => attendance.user.id);
                res.forEach((student: any) => {
                    student.attended = attendees.includes(student.user.id) ;
                });
                setStudents(res);
            });
        })
    }, []);

    const captureAndSend = async () => {
        if (!webcamRef.current) {
            console.error('Webcam reference is null.');
            return;
        }
        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) {
            console.error('Failed to capture screenshot.');
            setError('Failed to capture screenshot. Please try again.');
            return;
        }
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/face-recognition/detect', {
                image: imageSrc,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
                AttendanceService.saveAttendance(res.data.predicted_class, id, AttendanceStatus.PRESENT)
                const predictedClass = res.data.predicted_class;
                let student = students.find((student: any) => student.user.username === predictedClass);
                student.attended = true;
                setAttended([...attended, student.user.id]);
                setResponse(res.data);
                setError("");
            });


        } catch (err) {
            console.error('Error sending the image:', err);
            setError('Error sending the image. Please try again later.');
        }
    };

    return (
        <div className={"common_container justify-content-center"}>
            <div className={"justify-center"} style={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
                <h1>Attendance for Class</h1>
                <h2>Lecture:{times?.lesson.name}</h2>
                <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{
                        facingMode: 'user',
                    }}
                />
                <Button style={{margin: '10px', fontSize: '1.2em'}} onClick={captureAndSend}>Scan Face</Button>
                {error && <p style={{color: 'red'}}>{error}</p>}
                {response && (
                    <div>
                        <h2>Prediction</h2>
                        <p>{response.predicted_class}</p>
                        <p>Confidence: {response.confidence?.toFixed(2)}%</p>
                    </div>
                )}
            </div>

            <div className={"ms-10"}>
                <Label className={'text-xl'}>Students</Label>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className={'text-xl'}>ID</TableHead>
                            <TableHead className={'text-xl'}>Name</TableHead>
                            <TableHead className={'text-xl'}>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell>{student.user.id}</TableCell>
                                <TableCell className={'text-xl'}>{student.user.username}</TableCell>
                                <TableCell className={'text-xl'}>{attended.includes(student.user.id) ? "Attended" : "Not Attended"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Face;
