import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-c5">
      <div className="max-w-5xl mx-auto flex items-center justify-between py-3 px-4">
        <Link to="/Home" className="font-serif font-bold tracking-wide text-lg">
          PETGRAM
        </Link>
        <div className="text-sm space-x-2">
          <Link to="/Login" className="text-p5 hover:text-p1 transition">Login | Criar</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;