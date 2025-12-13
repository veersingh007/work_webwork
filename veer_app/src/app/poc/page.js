export default function POCPage() {
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Proof of Concepts (POCs)</h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Explore various POCs demonstrating capabilities in AI, Image Processing,
        Computer Vision, and Automation.
      </p>

      <section className="space-y-6">
        {/* Face Detection POC */}
        <div>
          <a
            href="/poc/face_detection_poc"
            className="text-blue-500 underline text-xl"
          >
            👉 Face Detection POC
          </a>
          <p className="text-gray-600 dark:text-gray-400">
            Capture image using camera and detect faces.
          </p>
        </div>

        {/* Image Cropper POC */}
        <div>
          <a
            href="/poc/image_cropper_poc"
            className="text-blue-500 underline text-xl"
          >
            👉 Image Resize / Crop POC
          </a>
          <p className="text-gray-600 dark:text-gray-400">
            Capture image or open image, crop, and download images with a simple UI.
          </p>
        </div>

        {/* Object Detection (Capture + Backend) */}
        <div>
          <a
            href="/poc/obj_detection_with_backend"
            className="text-blue-500 underline text-xl"
          >
            👉 Object Detection (Backend) POC
          </a>
          <p className="text-gray-600 dark:text-gray-400">
            Capture image using camera and detect objects using a Python YOLO backend. 
            This will not work when my laptop is not online or off.
            Tested with backend on my laptop. I will later move backend to cloud to keep server available all the time.
          </p>
        </div>

        {/* Object Detection (Live Backend) */}
        <div>
          <a
            href="/poc/obj_detection_with_backend_live"
            className="text-blue-500 underline text-xl"
          >
            👉 Object Detection (Live Backend) POC
          </a>
          <p className="text-gray-600 dark:text-gray-400">
            Live camera stream with continuous object detection using backend YOLO.
            This will not work when my laptop is not online or off.
            Tested with backend on my laptop. I will later move backend to cloud to keep server available all the time.
          </p>
        </div>

        {/* Additional POCs Placeholder */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            More POCs Coming Soon
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Additional AI, ML, and automation demos will be added here.
          </p>
        </div>
      </section>
    </main>
  );
}
