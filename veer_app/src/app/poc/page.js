"use client";

import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

export default function POCPage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      setModelsLoaded(true);
    };

    loadModels();
  }, []);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

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
      <h1 className="text-4xl font-bold mb-6">POC – Face Detection</h1>

      {!modelsLoaded && (
        <p className="text-red-500">Loading face detection models...</p>
      )}

      <div className="space-y-4 mt-6">
        <video ref={videoRef} autoPlay className="w-full max-w-md rounded shadow" />

        <button
          onClick={startCamera}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Start Camera
        </button>

        <button
          onClick={capturePhoto}
          className="px-4 py-2 bg-green-600 text-white rounded"
          disabled={!modelsLoaded}
        >
          Capture + Detect Face
        </button>

        <canvas ref={canvasRef} className="w-full max-w-md rounded shadow" />
      </div>
    </main>
  );
}
