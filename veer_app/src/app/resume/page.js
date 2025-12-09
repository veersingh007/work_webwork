// =====================
// app/resume/page.js (FULL RESUME PAGE)
// =====================
export default function ResumePage() {
return (
<main className="min-h-screen p-8 max-w-4xl mx-auto">
<h1 className="text-4xl font-bold mb-6">Full Resume</h1>


<section className="mb-6">
<h2 className="text-2xl font-semibold">Professional Summary</h2>
<p className="mt-2 leading-7">
Senior Software Engineer with 12+ years of experience in AI/ML, Computer Vision, C/C++ development,
system optimization, and network security. Proven expertise in designing automation frameworks, deploying
real-time AI solutions, and leading engineering efforts across Automotive, Smart City, Retail Analytics,
and Security domains.
</p>
</section>


<section className="mb-6">
<h2 className="text-2xl font-semibold">Contact</h2>
<p>Email: veer.exe@gmail.com</p>
<p>Phone: +91 7359556762</p>
<p>LinkedIn: linkedin.com/in/veer-singh-50378433/</p>
</section>


<section className="mb-6">
<h2 className="text-2xl font-semibold">Technical Skills</h2>
<ul className="list-disc ml-6 space-y-1 mt-2">
<li><strong>Programming:</strong> C, C++, Python, Shell, Perl</li>
<li><strong>AI/ML:</strong> YOLO, Keras, TensorFlow, CNN, OpenCV</li>
<li><strong>Security:</strong> Network Security, Web/Email Filtering, DLP</li>
<li><strong>Tools:</strong> Git, SVN, CMake, CI/CD, Agile</li>
<li><strong>Platforms:</strong> Linux, Qt, OpenFrameworks</li>
</ul>
</section>


<section className="mb-6">
<h2 className="text-2xl font-semibold">Experience</h2>


<div className="mt-4">
<h3 className="text-xl font-semibold">Wipro Ltd — Senior Software Engineer</h3>
<p className="italic">Ford Motors | June 2024 – Present</p>
<ul className="list-disc ml-6 mt-2 space-y-1">
<li>Leading Virtual HMI Automation Testing using C++, OpenCV, AI/ML.</li>
<li>Developed Ego & Surround Vehicle Detection models for automation APIs.</li>
<li>Collaborating with Ford Detroit engineering teams.</li>
</ul>
</div>


<div className="mt-6">
<h3 className="text-xl font-semibold">Lookman Electroplast — Senior Software Engineer</h3>
<p className="italic">Smart City Projects | Feb 2020 – Sept 2022</p>
<ul className="list-disc ml-6 mt-2 space-y-1">
<li>Developed Illegal Parking & Abandoned Object Detection systems.</li>
<li>Worked with YOLOv4, Python, C++, Qt, OpenCV.</li>
<li>Improved deep learning model accuracy and deployment speed.</li>
</ul>
</div>


<div className="mt-6">
<h3 className="text-xl font-semibold">Einfochips — Senior Software Engineer</h3>
<p className="italic">Whirlpool | Apr 2019 – Jan 2020</p>
<ul className="list-disc ml-6 mt-2 space-y-1">
<li>Implemented flickering screen detection pipeline.</li>
<li>Developed image-based automation tests using YOLOv2.</li>
</ul>
</div>


<div className="mt-6">
<h3 className="text-xl font-semibold">Kochar Infotech — Senior Software Engineer</h3>
<p className="italic">Retail Analytics | Mar 2018 – Apr 2019</p>
<ul className="list-disc ml-6 mt-2 space-y-1">
<li>Built People Counting & Non-compliance Detection models.</li>
<li>Worked on retail analytics using OpenCV, Python, C++, Keras.</li>
</ul>
</div>


<div className="mt-6">
<h3 className="text-xl font-semibold">Sabse Technology — Senior Software Engineer</h3>
<p className="italic">Toll Automation | Jun 2017 – Mar 2018</p>
<ul className="list-disc ml-6 mt-2 space-y-1">
<li>Developed congestion detection & vehicle classification models.</li>
<li>Used C++, OpenCV, AI/ML for real-time analytics.</li>
</ul>
</div>


<div className="mt-6">
<h3 className="text-xl font-semibold">Sophos — Software Engineer</h3>
<p className="italic">Network Security | Feb 2012 – Jun 2017</p>
<ul className="list-disc ml-6 mt-2 space-y-1">
<li>Developed Web & Email filtering modules using C and Linux.</li>
<li>Implemented DLP, Antivirus, Spam Filtering, ACL filtering.</li>
<li>Worked with HTTP/SMTP RFC implementations.</li>
</ul>
</div>


<div className="mt-6">
<h3 className="text-xl font-semibold">Sai Infotech — Software Engineer</h3>
<p className="italic">Video Desk Phone | Mar 2011 – Jan 2012</p>
<ul className="list-disc ml-6 mt-2 space-y-1">
<li>Built UI screens & browser features using C/C++ and Qt.</li>
<li>Implemented call logs, contacts, dial interface modules.</li>
</ul>
</div>
</section>
</main>
);
}