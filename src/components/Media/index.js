import React, { useState, useRef } from "react";

const CameraApp = () => {
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const takePicture = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext("2d").drawImage(videoRef.current, 0, 0);

      const imageDataUrl = canvas.toDataURL("image/png");
      setCapturedImage(imageDataUrl);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };
  const retake = async () => {
    setCapturedImage(null);
    await startCamera();
  };
  return (
    <div>
      <div>
        {stream ? (
          <button onClick={stopCamera}>Stop Camera</button>
        ) : (
          !capturedImage && <button onClick={startCamera}>Start Camera</button>
        )}
        {stream && <button onClick={takePicture}>Take Picture</button>}
      </div>
      {!capturedImage && (
        <div>
          <video ref={videoRef} autoPlay playsInline />
        </div>
      )}
      {capturedImage && (
        <div>
          <i className="fa fa-camera" onClick={retake}></i>
          <h2>Captured Picture</h2>
          <img src={capturedImage} alt="Captured" />
        </div>
      )}
    </div>
  );
};

export default CameraApp;
