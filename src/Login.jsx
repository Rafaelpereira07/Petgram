import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex flex-1 min-h-[600px]">
        <div className="w-1/2 h-full bg-p1 flex items-center justify-center relative">
          <img 
            src="src/assets/fotos/Img5.png" 
            alt="Pet Illustration" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-1/2 flex flex-col justify-center px-8">
          <div className="max-w-md w-full mx-auto">
            <h1 className="font-serif text-4xl font-bold text-p5 mb-6">Login</h1>
            <form className="mb-8">
              <label className="block font-inter font-medium text-base text-p5 mb-2">Usuário</label>
              <input className="w-full rounded px-4 py-2 bg-linear-to-r from-gray-200 to-gray-100 mb-4" type="text" />
              <label className="block font-inter font-medium text-base text-p5 mb-2">Senha</label>
              <input className="w-full rounded px-4 py-2 bg-linear-to-r from-gray-200 to-gray-100 mb-4" type="password" />
              <button className="w-full bg-linear-to-b from-p1 to-p2 rounded shadow px-6 py-2 text-p5 font-poppins font-semibold text-lg transition hover:brightness-95" type="submit">
                Entrar
              </button>
            </form>
            <h2 className="font-serif text-3xl font-bold text-p5 mb-2">Cadastre-se</h2>
            <p className="text-p5 font-inter text-base mb-4">Ainda não possui conta? Cadastre-se no site.</p>
            <Link
              to="/Cadastro"
              className="w-full bg-linear-to-b from-p1 to-p2 rounded shadow px-6 py-2 text-p5 font-poppins font-semibold text-lg text-center inline-block transition hover:brightness-95"
            >
              Cadastro
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
