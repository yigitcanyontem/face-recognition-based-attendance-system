import React, {useRef, useState} from "react";
import axios from "axios";
import {AttendanceService} from "@/services/attendance-service.ts";
import {AttendanceStatus} from "@/models/AttendanceStatus.ts";
import Webcam from "react-webcam";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {useToast} from "@/hooks/use-toast.ts";
import {AuthService} from "@/services/auth-service.ts";
import {useNavigate} from "react-router-dom";

const LoginWithFace = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const webcamRef = useRef(null);
    const {toast} = useToast()
    let navigate = useNavigate();

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
                setResponse(res.data);
                const predictedClass = res.data.predicted_class;
                if (predictedClass == 'Unknown'){
                    setError("User Unknown")
                    console.log(error)
                }else {
                    AuthService.loginWithFace(res.data.predicted_class).then(r => {
                        toast({
                            title: "Login successful, welcome " + predictedClass
                        })
                        navigate(r.role === 'TEACHER' ? '/teacher' : '/student');
                        setTimeout(()=>{
                            window.location.reload()
                        },1500)
                        setError("");
                    }, (err) => {
                        console.error('Error saving attendance:', err);
                    });
                }
            });
        } catch (err) {
            setError(err.response.data.error);
        }
    };

    return (
        <div className={"common_container justify-content-center"}>
            <div className={"justify-center"} style={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
                <Label className={"text-2xl mb-2"}>Login with Face ID</Label>
                <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    mirrored={true}
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
        </div>
    );

}
export default LoginWithFace;
