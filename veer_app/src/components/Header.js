export default function Header() {
  return (
    <header className="w-full p-4 bg-gray-900 text-white">
      <nav className="max-w-5xl mx-auto flex justify-between">
        <a href="/" className="font-semibold text-lg">Veer Singh</a>
        <div className="flex gap-6">
          <a href="/" className="hover:underline">Home</a>
          <a href="/Next_page" className="hover:underline">Experience</a>
        </div>
      </nav>
    </header>
  );
}
