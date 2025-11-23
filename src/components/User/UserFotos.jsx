import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Img1 from '../../assets/fotos/Img1.png';
import Img2 from '../../assets/fotos/Img2.png';
import Img3 from '../../assets/fotos/Img3.png';
import Img4 from '../../assets/fotos/Img4.png';
import Img5 from '../../assets/fotos/Img5.png';

const photos = [
  { id: 1, src: Img1 },
  { id: 2, src: Img2 },
  { id: 3, src: Img3 },
  { id: 4, src: Img4 },
  { id: 5, src: Img5 }
];

export default function UserFotos() {
  const [user, setUser] = useState(null);
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
    <div className="relative w-[1440px] h-[1024px] bg-white mx-auto overflow-hidden">
      <div className="absolute left-[396px] top-40">
        <span className="font-['PT_Serif'] font-bold text-5xl text-p5">Minhas Fotos</span>
      </div>

      <div className="absolute left-[868px] top-[170px] flex flex-row gap-4">
        <div className="w-11 h-11 bg-white rounded-md border border-p2 shadow-[0_0_2px_1px_#2E8EFF] flex justify-center items-center">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="#151B29" strokeWidth="2" fill="none" />
          </svg>
        </div>
        <div
          className="w-11 h-11 bg-white rounded-md border border-p5 flex justify-center items-center cursor-pointer"
          onClick={() => navigate("/user/post")}
          title="Postar Foto"
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <line x1="12" y1="6" x2="12" y2="18" stroke="#000" strokeWidth="2" />
            <line x1="6" y1="12" x2="18" y2="12" stroke="#000" strokeWidth="2" />
          </svg>
        </div>
        <div className="w-11 h-11 bg-white rounded-md border border-p5 flex justify-center items-center">
          <button onClick={handleLogout} aria-label="Sair" className="w-full h-full flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <line x1="6" y1="6" x2="18" y2="18" stroke="#000" strokeWidth="2" />
              <line x1="18" y1="6" x2="6" y2="18" stroke="#000" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>
      <div className="absolute w-[647px] h-[426px] left-[calc(50%-323.5px)] top-64">
        <div className="grid grid-cols-3 gap-6">
          {photos.map(photo => (
            <div
              key={photo.id}
              className="w-[205px] h-[205px] bg-white rounded-md overflow-hidden flex items-center justify-center shadow"
            >
              <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
