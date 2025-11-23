import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("petgram_user");
    if (raw) {
      setUser(JSON.parse(raw));
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-c5">
      <div className="max-w-5xl mx-auto flex items-center justify-between py-8 px-48">
        <Link to="/Home" className="font-serif font-bold tracking-wide text-[24px]">
          PETGRAM
        </Link>
        <div className="text-[18px] font-medium space-x-2">
          {user ? (
            <Link to="/user/fotos" className="text-p5">
              {user.name}
            </Link>
          ) : (
            <Link to="/Login" className="text-p5">login \ criar</Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
