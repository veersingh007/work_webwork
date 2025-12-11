"use client";

import { useRef, useState, useEffect } from "react";
import Cropper from "cropperjs";

export default function ImageCropperPOC() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const cropperRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  // Start camera
  const startCamera = async () => {
    const videoStream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    if (videoRef.current) {
      videoRef.current.srcObject = videoStream;
      setStream(videoStream);
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null); // Hide video when stopped
    }
  };

  // Capture image from camera
  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!video) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const dataUrl = canvas.toDataURL("image/png");
    setImageSrc(dataUrl);
  };

  // Load image from file
  const loadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result);
    reader.readAsDataURL(file);
  };

  // Initialize cropper whenever image changes
  useEffect(() => {
    if (imageSrc) {
      const image = document.getElementById("image-to-crop");

      if (cropperRef.current) {
        cropperRef.current.destroy();
      }

      cropperRef.current = new Cropper(image, {
        aspectRatio: NaN,
        viewMode: 1,
      });
    }
  }, [imageSrc]);

  // Download cropped image
  const downloadCroppedImage = () => {
    if (!cropperRef.current) return;

    const croppedCanvas = cropperRef.current.getCroppedCanvas();
    const url = croppedCanvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = url;
    link.download = "cropped_image.png";
    link.click();
  };

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Image Cropper POC</h1>

      <div className="space-y-6">

        {/* FILE UPLOAD */}
        <div>
          <p className="mb-2 font-medium">
            Select an image file from your device to start cropping:
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={loadImage}
            className="border p-2"
          />
        </div>

        {/* CAMERA CONTROLS */}
        <div className="flex gap-4">
          <button
            onClick={startCamera}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Start Camera
          </button>

          <button
            onClick={stopCamera}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Stop Camera
          </button>

          {stream && (
            <button
              onClick={captureImage}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Capture From Camera
            </button>
          )}
        </div>

        {/* CAMERA VIDEO VIEW (always in DOM, hidden until stream starts) */}
        <video
          ref={videoRef}
          autoPlay
          className={`w-full max-w-md rounded shadow mt-4 ${!stream ? "hidden" : ""}`}
        />

        {/* CROPPER AREA */}
        {imageSrc && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Crop Image</h2>
            <img
              id="image-to-crop"
              src={imageSrc}
              alt="Selected"
              className="max-w-full rounded"
            />

            <button
              onClick={downloadCroppedImage}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded"
            >
              Download Cropped Image
            </button>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </main>
  );
}
