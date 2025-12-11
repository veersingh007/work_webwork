"use client";

import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

export default function FaceDetectionPOC() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [stream, setStream] = useState(null);

  // Load models
  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      setModelsLoaded(true);
    };
    loadModels();
  }, []);

  // Start Camera
  const startCamera = async () => {
    const videoStream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    videoRef.current.srcObject = videoStream;
    setStream(videoStream);
  };

  // Stop Camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    videoRef.current.srcObject = null;
  };

  // Capture + Detect Faces
  const capturePhoto = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const detections = await faceapi.detectAllFaces(
      canvas,
      new faceapi.TinyFaceDetectorOptions()
    );

    detections.forEach((d) => {
      const { x, y, width, height } = d.box;
      ctx.strokeStyle = "yellow";
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, width, height);
    });
  };

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Face Detection POC</h1>

      {!modelsLoaded && (
        <p className="text-red-500">Loading face detection models...</p>
      )}

      <div className="space-y-4 mt-8">
        <video
          ref={videoRef}
          autoPlay
          className="w-full max-w-md rounded shadow"
        />

        {/* Camera Controls */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={startCamera}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Start Camera
          </button>

          <button
            onClick={stopCamera}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Stop Camera
          </button>
        </div>

        <button
          onClick={capturePhoto}
          disabled={!modelsLoaded}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Capture + Detect Face
        </button>

        <canvas
          ref={canvasRef}
          className="w-full max-w-md rounded shadow"
        />
      </div>
    </main>
  );
}
