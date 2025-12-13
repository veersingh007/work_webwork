"use client";

import { useRef, useState, useEffect } from "react";

export default function ObjectDetectionWithBackendLivePOC() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [running, setRunning] = useState(false);

  /* ---------------- START CAMERA ---------------- */

  const startCamera = async () => {
    const videoStream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    videoRef.current.srcObject = videoStream;
    setStream(videoStream);
    setRunning(true);
  };

  /* ---------------- STOP CAMERA ---------------- */

  const stopCamera = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    setStream(null);
    setRunning(false);

    // Clear canvas
    const ctx = canvasRef.current?.getContext("2d");
    ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  /* ---------------- DETECTION LOOP ---------------- */

  useEffect(() => {
    if (!running) return;

    intervalRef.current = setInterval(runDetection, 700); // adjust FPS here

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const runDetection = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || video.videoWidth === 0) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg")
    );

    const formData = new FormData();
    formData.append("file", blob, "frame.jpg");

    try {
      const res = await fetch("http://localhost:8000/detect", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      drawBoxes(data.detections || []);
    } catch (err) {
      console.error("YOLO detection error:", err);
    }
  };

  /* ---------------- DRAW BOXES ---------------- */

  const drawBoxes = (detections) => {
    const ctx = canvasRef.current.getContext("2d");

    ctx.lineWidth = 2;
    ctx.font = "16px sans-serif";

    detections.forEach((det) => {
      ctx.strokeStyle = "red";
      ctx.fillStyle = "red";

      ctx.strokeRect(det.x, det.y, det.w, det.h);
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
        Object Detection – Live (Backend YOLO)
      </h1>

      <div className="space-y-6">
        {/* CONTROLS */}
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
        </div>

        {/* VIDEO + CANVAS OVERLAY */}
        <div className="relative w-full max-w-md">
          <video
            ref={videoRef}
            autoPlay
            className={`${!stream ? "hidden" : ""} w-full rounded`}
          />

          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>

        {/* INFO */}
        {running && (
          <p className="text-sm text-gray-600">
            Live detection running (backend YOLO, ~1 frame / 700ms)
          </p>
        )}
      </div>
    </main>
  );
}
