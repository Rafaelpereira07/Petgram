import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from '../Footer';

export default function UserPost() {
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    // validação básica
    if (!form.nome.trim() || !form.idade.trim() || !form.peso.trim() || !preview) {
      alert("Preencha todos os campos e escolha uma imagem.");
      return;
    }

    // criar novo objeto de foto (src = data URL do preview)
    const newFoto = {
      id: Date.now().toString(),
      src: preview,
      name: form.nome,
      age: form.idade,
      weight: form.peso,
      uploader: user?.username || "Você",
      comments: []
    };

    const saved = JSON.parse(localStorage.getItem("petgram_fotos") || "[]");
    // coloca no começo para aparecer primeiro
    saved.unshift(newFoto);
    localStorage.setItem("petgram_fotos", JSON.stringify(saved));

    // resetar form e preview
    setForm({ nome: "", idade: "", peso: "" });
    setPhoto(null);
    setPreview(null);

    // ir para a home para ver a foto publicada
    navigate("/");
  };

  if (!user) return null;

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 flex flex-col items-center pt-20 md:pt-40 pb-8 px-4">
        <div className="w-full max-w-6xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-['PT_Serif'] font-bold text-3xl md:text-5xl text-p5">
              Postar Foto
            </h1>

            {/* Menu Desktop */}
            <div className="hidden md:flex flex-row gap-4">
              <button 
                className="w-11 h-11 bg-white rounded-md border border-p5 flex justify-center items-center cursor-pointer"
                onClick={() => navigate("/user/fotos")}
                title="Minhas Fotos"
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="#151B29" strokeWidth="2" fill="none" />
                </svg>
              </button>

              <button
                className="w-11 h-11 bg-white rounded-md border border-p2 shadow-[0_0_2px_1px_#2E8EFF] flex justify-center items-center"
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

            {/* Menu Mobile */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-11 h-11 bg-white rounded-md border border-p5 flex flex-col justify-center items-center gap-1.5"
              >
                <div className="w-6 h-0.5 bg-black"></div>
                <div className="w-6 h-0.5 bg-black"></div>
                <div className="w-6 h-0.5 bg-black"></div>
              </button>

              {/* Menu Dropdown */}
              {isMenuOpen && (
                <div className="absolute right-4 mt-3 w-48 bg-white rounded-md shadow-lg border border-p5 z-10">
                  <div className="flex flex-col p-2 gap-2">
                    <button 
                      className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md"
                      onClick={() => {
                        navigate("/user/fotos");
                        setIsMenuOpen(false);
                      }}
                    >
                      <div className="w-8 h-8 border border-p5 rounded flex justify-center items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" stroke="#151B29" strokeWidth="2" fill="none" />
                        </svg>
                      </div>
                      <span>Minhas Fotos</span>
                    </button>

                    <button
                      className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md bg-gray-50"
                    >
                      <div className="w-8 h-8 border border-p2 shadow-[0_0_2px_1px_#2E8EFF] rounded flex justify-center items-center">
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

          {/* Formulário e Preview */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start justify-center">
            {/* Formulário */}
            <form 
              className="flex flex-col gap-6 w-full max-w-md" 
              onSubmit={handleSubmit}
            >
              <input
                className="rounded-md bg-gray-100 p-4 font-sans w-full focus:outline-none focus:ring-2 focus:ring-p2"
                type="text"
                placeholder="Nome"
                name="nome"
                value={form.nome}
                onChange={handleChange}
              />
              <input
                className="rounded-md bg-gray-100 p-4 font-sans w-full focus:outline-none focus:ring-2 focus:ring-p2"
                type="text"
                placeholder="Idade"
                name="idade"
                value={form.idade}
                onChange={handleChange}
              />
              <input
                className="rounded-md bg-gray-100 p-4 font-sans w-full focus:outline-none focus:ring-2 focus:ring-p2"
                type="text"
                placeholder="Peso"
                name="peso"
                value={form.peso}
                onChange={handleChange}
              />
              
              <div className="flex flex-col gap-4">
                <label className="cursor-pointer flex items-center gap-3">
                  <span className="bg-white border border-gray-400 rounded px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
                    Escolher Arquivo
                  </span>
                  <span className="text-gray-600 truncate flex-1">
                    {photo ? photo.name : 'Nenhum arquivo selecionado'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              
              <button
                type="submit"
                className="w-full  from-p1 to-p2 text-white rounded-lg shadow px-6 py-4 text-lg font-sans font-bold transition-all hover:brightness-95 hover:shadow-lg active:scale-95"
              >
                Enviar
              </button>
            </form>

            {/* Preview - APENAS NO DESKTOP */}
            <div className=" md:block w-full max-w-md md:max-w-xs lg:max-w-sm aspect-square rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center shadow-lg">
              {preview ? (
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <span className="text-gray-400 text-center p-4">
                  Nenhuma imagem selecionada
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}