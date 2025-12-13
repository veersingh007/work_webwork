"use client";

import { useRef, useState } from "react";

export default function ObjectDetectionWithBackendPOC() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [detections, setDetections] = useState([]);

  /* ---------------- CAMERA ---------------- */

  const startCamera = async () => {
    const videoStream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    videoRef.current.srcObject = videoStream;
    setStream(videoStream);
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
  };

  /* ---------------- CAPTURE ---------------- */

  const captureAndDetect = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    // Convert canvas → blob
    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg")
    );

    const formData = new FormData();
    formData.append("file", blob, "frame.jpg");

    // Call YOLO backend
    const res = await fetch("http://localhost:8000/detect", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("YOLO result:", data);

    setDetections(data.detections || []);
    drawBoxes(data.detections || []);
  };

  /* ---------------- DRAW BOXES ---------------- */

  const drawBoxes = (detections) => {
    const ctx = canvasRef.current.getContext("2d");

    detections.forEach((det) => {
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.strokeRect(det.x, det.y, det.w, det.h);
      ctx.font = "16px sans-serif";
      ctx.fillStyle = "red";
      ctx.fillText(
        `${det.label} (${det.confidence})`,
        det.x,
        det.y - 5
      );
    });
  };

  /* ---------------- UI ---------------- */

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">
        Object Detection (Backend YOLO POC)
      </h1>

      <div className="space-y-6">
        {/* CAMERA CONTROLS */}
        <div className="flex gap-4">
          <button
            onClick={startCamera}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Start Camera
          </button>

          <button
            onClick={stopCamera}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Stop Camera
          </button>

          {stream && (
            <button
              onClick={captureAndDetect}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Capture & Detect
            </button>
          )}
        </div>

        {/* VIDEO (hidden until camera starts) */}
        <video
          ref={videoRef}
          autoPlay
          className={`w-full max-w-md rounded shadow ${
            !stream ? "hidden" : ""
          }`}
        />

        {/* CANVAS (shows captured frame + boxes) */}
        <canvas
          ref={canvasRef}
          className="w-full max-w-md border rounded"
        />

        {/* DETECTION LIST */}
        {detections.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mt-4">
              Detections
            </h2>
            <ul className="list-disc pl-6">
              {detections.map((d, i) => (
                <li key={i}>
                  {d.label} – confidence {d.confidence}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
