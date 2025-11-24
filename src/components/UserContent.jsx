import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; // Ajuste o caminho conforme necessário

function MinhasFotos() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useUser(); // Pegamos a função do contexto

  // Função correta para fazer logout
  const handleLogout = () => {
    // Usa a função do contexto para limpar o usuário
    updateUser(null);
    
    // Fecha o menu mobile se estiver aberto
    setIsMenuOpen(false);
    
    // Redireciona para a página de login
    navigate('/login');
  };

  return (
    <div className="relative w-full min-h-screen bg-white mx-auto overflow-hidden px-4 py-8 md:px-0 md:py-0">

      <div className="md:relative md:w-full md:min-h-screen md:mx-auto">

        <div className="text-center mb-8 md:absolute md:left-[396px] md:top-40 md:text-left">
          <span className="font-['PT_Serif'] font-bold text-3xl md:text-5xl text-p5">Minhas Fotos</span>
        </div>

        <div className="md:hidden flex justify-end mb-6">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 flex items-center justify-center"
          >
            <img 
              src="/assets/fotos/hamburguer.png" 
              alt="Menu" 
              className="w-6 h-6"
            />
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 right-4 bg-white rounded-md shadow-lg border border-p5 z-50 p-3">
            <div className="flex flex-col gap-3">
              <div 
                className="w-10 h-10 bg-white rounded-md border border-p2 shadow-[0_0_2px_1px_#2E8EFF] flex justify-center items-center cursor-pointer"
                title="Perfil"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="#151B29" strokeWidth="2" fill="none" />
                </svg>
              </div>
              
              <div
                className="w-10 h-10 bg-white rounded-md border border-p5 flex justify-center items-center cursor-pointer"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/user/post");
                }}
                title="Postar Foto"
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <line x1="12" y1="6" x2="12" y2="18" stroke="#000" strokeWidth="2" />
                  <line x1="6" y1="12" x2="18" y2="12" stroke="#000" strokeWidth="2" />
                </svg>
              </div>
              
              <div 
                className="w-10 h-10 bg-white rounded-md border border-p5 flex justify-center items-center cursor-pointer"
                onClick={handleLogout}
                title="Sair"
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <line x1="6" y1="6" x2="18" y2="18" stroke="#000" strokeWidth="2" />
                  <line x1="18" y1="6" x2="6" y2="18" stroke="#000" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        )}

        <div className="hidden md:flex md:absolute md:left-[868px] md:top-[170px] md:flex-row md:gap-4">
          <div 
            className="w-11 h-11 bg-white rounded-md border border-p2 shadow-[0_0_2px_1px_#2E8EFF] flex justify-center items-center cursor-pointer"
            title="Perfil"
          >
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
          
          <div 
            className="w-11 h-11 bg-white rounded-md border border-p5 flex justify-center items-center cursor-pointer"
            onClick={handleLogout}
            title="Sair"
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <line x1="6" y1="6" x2="18" y2="18" stroke="#000" strokeWidth="2" />
              <line x1="18" y1="6" x2="6" y2="18" stroke="#000" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <div className="w-full md:absolute md:w-[647px] md:h-[426px] md:left-[calc(50%-323.5px)] md:top-64">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {photos.map(photo => (
              <div
                key={photo.id}
                className="w-full aspect-square bg-white rounded-md overflow-hidden flex items-center justify-center shadow"
              >
                <img 
                  src={photo.src} 
                  alt={photo.alt} 
                  className="w-full h-full object-cover" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-0 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
}