import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';

function Cadastro() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex flex-1 min-h-[600px] flex-col lg:flex-row pt-16 lg:pt-0">
        <div className="hidden lg:flex lg:w-1/2 h-full bg-p1 items-center justify-center relative">
          <img 
            src="src/assets/fotos/Foto_CadLog.png" 
            alt="Pet Illustration" 
            className="min-h-[988px] w-auto object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center py-8 lg:py-0 lg:mt-55 px-6 sm:px-8 lg:px-12.5">
          <div className="max-w-full lg:max-w-[445px] w-full lg:w-[689px] mx-auto">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[48px] font-bold text-p5 mb-8 lg:mb-14">Cadastre-se</h1>
            
            <form className="mb-8">
              <div>
                <label className="block font-sans font-medium text-base sm:text-[18px] text-p5 mb-3">Nome</label>
                <input 
                  className="w-full lg:w-91.5 rounded px-4 py-4 lg:py-6 bg-linear-to-r from-c1 to-c1 mb-6 lg:mb-7" 
                  type="text" 
                  placeholder="Nome"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-base sm:text-[18px] text-p5 mb-3">Usuário</label>
                <input 
                  className="w-full lg:w-91.5 rounded px-4 py-4 lg:py-6 bg-linear-to-r from-c1 to-c1 mb-6 lg:mb-7" 
                  type="text" 
                  placeholder="Usuário" 
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-base sm:text-[18px] text-p5 mb-3">Senha</label>
                <input 
                  className="w-full lg:w-91.5 rounded px-4 py-4 lg:py-6 bg-linear-to-r from-c1 to-c1 mb-6 lg:mb-7" 
                  type="password" 
                  placeholder="Senha" 
                />
              </div>
              <button
                className="w-full lg:w-50 mt-8 lg:mt-10 bg-linear-to-b from-p1 to-p2 rounded shadow px-6 py-4.5 text-p5 font-sans font-semibold text-base sm:text-[18px] text-center inline-block transition hover:brightness-95"
                type="submit"
              >
                Cadastro
              </button>
            </form>
          </div>
        </div>
      </main>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}

export default Cadastro;
