import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Img1 from '../../assets/fotos/Img1.png';
import Img2 from '../../assets/fotos/Img2.png';
import Img3 from '../../assets/fotos/Img3.png';
import Img4 from '../../assets/fotos/Img4.png';
import Img5 from '../../assets/fotos/Img5.png';

const photos = [
  { id: 1, src: Img1, alt: "Foto 1" },
  { id: 2, src: Img2, alt: "Foto 2" },
  { id: 3, src: Img3, alt: "Foto 3" },
  { id: 4, src: Img4, alt: "Foto 4" },
  { id: 5, src: Img5, alt: "Foto 5" }
];

export default function UserFotos() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const raw = localStorage.getItem("petgram_user");
    if (!raw) {
      navigate("/login");
      return;
    }
    try {
      setUser(JSON.parse(raw));
    } catch {
      localStorage.removeItem("petgram_user");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("petgram_user");
    navigate("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <main className="flex flex-col items-center min-h-screen pt-20 md:pt-40 pb-24 bg-white px-4">
      <div className="w-full max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-['PT_Serif'] font-bold text-3xl md:text-5xl text-p5">
            Minhas Fotos
          </h1>
          <div className="hidden md:flex flex-row gap-4">
            <button className="w-11 h-11 bg-white rounded-md border border-p2 shadow-[0_0_2px_1px_#2E8EFF] flex justify-center items-center">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="#151B29" strokeWidth="2" fill="none" />
              </svg>
            </button>
            <button
              className="w-11 h-11 bg-white rounded-md border border-p5 flex justify-center items-center cursor-pointer"
              onClick={() => navigate("/user/post")}
              title="Postar Foto"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <line x1="12" y1="6" x2="12" y2="18" stroke="#000" strokeWidth="2" />
                <line x1="6" y1="12" x2="18" y2="12" stroke="#000" strokeWidth="2" />
              </svg>
            </button>
            <button 
              className="w-11 h-11 bg-white rounded-md border border-p5 flex justify-center items-center"
              onClick={handleLogout}
              aria-label="Sair"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <line x1="6" y1="6" x2="18" y2="18" stroke="#000" strokeWidth="2" />
                <line x1="18" y1="6" x2="6" y2="18" stroke="#000" strokeWidth="2" />
              </svg>
            </button>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-11 h-11 bg-white rounded-md border border-p5 flex flex-col justify-center items-center gap-1.5"
            >
              <div className="w-6 h-0.5 bg-black"></div>
              <div className="w-6 h-0.5 bg-black"></div>
              <div className="w-6 h-0.5 bg-black"></div>
            </button>
            {isMenuOpen && (
              <div className="absolute right-4 mt-3 w-48 bg-white rounded-md shadow-lg border border-p5 z-10">
                <div className="flex flex-col p-2 gap-2">
                  <button className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md">
                    <div className="w-8 h-8 border border-p2 shadow-[0_0_2px_1px_#2E8EFF] rounded flex justify-center items-center">
                      <svg width="16" height="16" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="#151B29" strokeWidth="2" fill="none" />
                      </svg>
                    </div>
                    <span>Opção 1</span>
                  </button>

                  <button
                    className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md"
                    onClick={() => {
                      navigate("/user/post");
                      setIsMenuOpen(false);
                    }}
                  >
                    <div className="w-8 h-8 border border-p5 rounded flex justify-center items-center">
                      <svg width="16" height="16" viewBox="0 0 24 24">
                        <line x1="12" y1="6" x2="12" y2="18" stroke="#000" strokeWidth="2" />
                        <line x1="6" y1="12" x2="18" y2="12" stroke="#000" strokeWidth="2" />
                      </svg>
                    </div>
                    <span>Postar Foto</span>
                  </button>
                  <button 
                    className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <div className="w-8 h-8 border border-p5 rounded flex justify-center items-center">
                      <svg width="16" height="16" viewBox="0 0 24 24">
                        <line x1="6" y1="6" x2="18" y2="18" stroke="#000" strokeWidth="2" />
                        <line x1="18" y1="6" x2="6" y2="18" stroke="#000" strokeWidth="2" />
                      </svg>
                    </div>
                    <span>Sair</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 w-full">
          {photos.map(photo => (
            <div
              key={photo.id}
              className="rounded overflow-hidden shadow-sm bg-white cursor-pointer transition-transform hover:scale-105"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-auto aspect-square object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}