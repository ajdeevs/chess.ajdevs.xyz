const Navbar = () => {
  return (
    <header className="bg-[#0f172a] border-b border-slate-800 text-white py-4 px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">&#9812; CheckMate</h1>
        <nav className="text-sm space-x-6">
          <a href="/" className="hover:underline text-slate-300">
            Home
          </a>
          <a href="/game" className="hover:underline text-slate-300">
            Play
          </a>
          <a href="/about" className="hover:underline text-slate-300">
            About
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
