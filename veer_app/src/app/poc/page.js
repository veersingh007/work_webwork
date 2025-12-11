export default function POCPage() {
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">POC – Proof of Concepts</h1>

      <section className="space-y-4 mt-6">
        <div>
          <a
            href="/poc/face_detection_poc"
            className="text-blue-500 underline text-xl"
          >
            👉 Face Detection POC
          </a>
        </div>

        <p className="text-gray-700 dark:text-gray-300">
          More POCs will be added soon…
        </p>
      </section>
    </main>
  );
}
