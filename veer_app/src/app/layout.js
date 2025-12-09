// =====================
// Add a simple navigation bar on all pages
// =====================
// app/layout.js
// =====================
import "./globals.css";


export const metadata = {
title: "Veer Singh | Portfolio",
description: "Professional portfolio of Veer Singh",
};


export default function RootLayout({ children }) {
return (
<html lang="en">
<body className="bg-white text-black dark:bg-black dark:text-white font-sans">
<nav className="w-full bg-gray-200 dark:bg-gray-800 p-4 flex gap-6 text-lg font-medium">
<a href="/" className="hover:underline">Home</a>
<a href="/resume" className="hover:underline">Resume</a>
<a href="/poc" className="hover:underline">POC</a>
</nav>
{children}
</body>
</html>
);
}