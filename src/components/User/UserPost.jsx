import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from '../Footer';

export default function UserPost() {
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    nome: "",
    idade: "",
    peso: ""
  });

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (!user) return null;

  return (
    <div className="relative w-[1440px] h-[1024px] bg-white mx-auto overflow-hidden">
      <div className="absolute left-[396px] top-40">
        <span className="font-['PT_Serif'] font-bold text-5xl text-p5">Postar Foto</span>
      </div>
      <div className="absolute left-[868px] top-[170px] flex flex-row gap-4">
        <div className="w-11 h-11 bg-white rounded-md border flex justify-center items-center " onClick={() => navigate("/user/fotos")}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="#151B29" strokeWidth="2" fill="none" />
          </svg>
        </div>
        <div
          className="w-11 h-11 bg-white rounded-md border border-p2 shadow-[0_0_2px_1px_#2E8EFF] flex justify-center items-center"
          title="Minhas Fotos"
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

      <div className="absolute left-[396px] top-64 flex flex-row gap-12 items-start">
        <form className="flex flex-col gap-10.5" style={{width: 365}} onSubmit={handleSubmit}>
          <input
            className="rounded-md bg-[#d9d9d9] p-4 font-sans"
            type="text"
            placeholder="Nome"
            name="nome"
            value={form.nome}
            onChange={handleChange}
          />
          <input
            className="rounded-md bg-[#d9d9d9] p-4 font-sans"
            type="text"
            placeholder="Idade"
            name="idade"
            value={form.idade}
            onChange={handleChange}
          />
          <input
            className="rounded-md bg-[#d9d9d9] p-4 font-sans"
            type="text"
            placeholder="Peso"
            name="peso"
            value={form.peso}
            onChange={handleChange}
          />
          <div className="flex items-center">
            <label className="cursor-pointer">
              <span className="bg-white border border-c4 rounded px-2 py-1 mr-2">
                Escolher Arquivo
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <span className="ml-2">{photo ? photo.name : ''}</span>
          </div>
          <button
            type="submit"
            className="w-34 bg-linear-to-b from-p1 to-p2 text-[18px] rounded shadow px-6 py-4.5 text-p5 font-sans font-bold text-lg transition hover:brightness-95"
          >
            Enviar
          </button>
        </form>
        <div className="w-[263px] h-[263px] rounded-md bg-[#d9d9d9] overflow-hidden flex items-center justify-center shadow">
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-400 p-4">Nenhuma imagem selecionada</span>
          )}
        </div>
      </div>
    </div>
  );
}
