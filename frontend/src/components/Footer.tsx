const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-slate-400 text-sm text-center py-4 border-t border-slate-800 mt-10">
      <div className="max-w-7xl mx-auto">
        <p>
          &copy; {new Date().getFullYear()} Chess Arena. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
