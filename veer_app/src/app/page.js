// =====================
// app/page.js (HOME PAGE)
// =====================
export default function Home() {
return (
<main className="min-h-screen p-8 max-w-4xl mx-auto">
<h1 className="text-4xl font-bold mb-4">Welcome to Veer Singh’s Portfolio</h1>
<p className="text-lg mb-6">Senior Software Engineer | AI/ML | Computer Vision | Network Security</p>


<section className="mt-8 space-y-4">
<div>
<a href="/resume" className="text-blue-500 underline text-xl">
👉 View Full Resume
</a>
</div>
<div>
<a href="/poc" className="text-blue-500 underline text-xl">
👉 View POC Work (Coming Soon)
</a>
</div>
</section>
</main>
);
}