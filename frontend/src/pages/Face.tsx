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

const Face = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const webcamRef = useRef(null);
    const [times, setTimes] = useState<LessonTime>();
    const [students, setStudents] = useState<any>([]);
    const {id} = useParams();
    const [attended, setAttended] = useState<any>([]);
    const [reload, setReload] = useState(false);
    useEffect(() => {
        LessonTimeService.getLessonTime(id).then(r => {
            setTimes(r);
            const attendedUsers = r.attendances.map((attendance: any) => attendance.user.id);
            setAttended(attendedUsers);
        })

        UserCourseService.getStudentsInCourse(parseInt(id)).then(r => {
            setStudents(r);
            console.log(r)
        });
    }, [reload]);

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
                setResponse(res.data);
                setReload(!reload);
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
                <Button style={{margin: '10px'}} onClick={captureAndSend}>Scan Face</Button>
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
                <h2>Students</h2>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {students.map((student: any) => (
                        <tr key={student.id}>
                            <td>{student.user.id}</td>
                            <td>{student.user.username}</td>
                            <td>{attended.includes(student.user.id) ? "Attended" : "Not Attended"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Face;
