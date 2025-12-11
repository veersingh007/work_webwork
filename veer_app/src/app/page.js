import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">

      {/* Title Section */}
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Veer Singh’s Portfolio
      </h1>

      <p className="text-lg mb-6">
        Senior Software Engineer | AI/ML | Computer Vision | Network Security
      </p>

      {/* Links */}
      <section className="mt-8 space-y-4">
        <div>
          <a href="/resume" className="text-blue-500 underline text-xl">
            👉 View Full Resume
          </a>
        </div>
        <div>
          <a href="/poc" className="text-blue-500 underline text-xl">
            👉 View POC Center (More comming soon)
          </a>
        </div>
      </section>

      {/* Photo + Entrepreneur Message */}
      <section className="pt-32 mt-32 flex flex-col items-center text-center">

        {/* Photo */}
        <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg mb-6 border-4 border-gray-300 dark:border-gray-700">
          <Image
            src="/veer.jpg"
            alt="Veer Singh"
            width={160}
            height={160}
            className="object-cover"
          />
        </div>

        {/* Vision Message */}
        <h2 className="text-2xl font-semibold mb-4">My Mission</h2>

        <p className="text-lg max-w-2xl leading-7 text-gray-700 dark:text-gray-300">
          As an engineer, my mission is to build intelligent systems
          that create real, positive impact.  
          I want to solve complex problems using AI, automation, and innovation—  
          ultimately transforming lives, empowering people, and improving society  
          through technology.
        </p>

      </section>

    </main>
  );
}
