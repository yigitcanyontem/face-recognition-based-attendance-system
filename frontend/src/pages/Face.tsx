import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';

const Face = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const webcamRef = useRef(null);

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
            });

            setResponse(res.data);
            setError(null);
        } catch (err) {
            console.error('Error sending the image:', err);
            setError('Error sending the image. Please try again later.');
        }
    };

    return (
        <div>
            <h1>Face Recognition Login</h1>
            <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                    facingMode: 'user',
                }}
            />
            <button onClick={captureAndSend}>Scan Face</button>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {response && (
                <div>
                    <h2>Prediction</h2>
                    <p>{response.predicted_class}</p>
                    <p>Confidence: {response.confidence?.toFixed(2)}%</p>
                </div>
            )}
        </div>
    );
};

export default Face;
