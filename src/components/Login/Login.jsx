import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Footer';

function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const demoUser = { username: "admin", password: "1234" };

  function handleLogin(e) {
    e.preventDefault();
    if (name === demoUser.username && password === demoUser.password) {
      localStorage.setItem("petgram_user", JSON.stringify({ name }));
      navigate("/user/fotos");
    } else {
      setError("Usuário ou senha incorretos");
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex flex-1 min-h-[600px]">
        <div className="w-1/2 h-full bg-p1 flex items-center justify-center relative">
          <img
            src="src/assets/fotos/Foto_CadLog.png"
            alt="Pet Illustration"
            className="mt-25 min-h-[988px] w-auto object-cover"
          />
        </div>
        <div className="w-1/2 h-211 flex flex-col mt-55 px-12.5">
          <div className="max-w-[450px] w-[750px]">
            <h1 className="font-serif text-[48px] font-bold text-p5 mb-14">Login</h1>
            <form onSubmit={handleLogin}>
              <label className="block font-sans font-medium text-[18px] text-p5 mb-3">Usuário</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome"
                className="w-91.5 rounded px-4 py-3.5 bg-linear-to-r from-c1 to-c1 mb-7"
              />
              <label className="block font-sans font-medium text-[18px] text-p5 mb-3">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                className="w-91.5 px-4 py-3.5 bg-linear-to-r from-c1 to-c1 mb-7"
              />
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <button
                type="submit"
                className="w-34 bg-linear-to-b from-p1 to-p2 text-[18px] rounded shadow px-6 py-4.5 text-p5 font-sans font-bold text-lg transition hover:brightness-95"
              >
                Entrar
              </button>
            </form>
            <h2 className="font-serif text-[48px] mt-18.5 font-bold text-p5 mb-2">Cadastre-se</h2>
            <p className="text-p5 font-sans text-[18px] mb-4">Ainda não possui conta? Cadastre-se no site.</p>
            <Link
              to="/Cadastro"
              className="w-41.5 bg-linear-to-b from-p1 to-p2 rounded shadow px-6 py-4.5 text-p5 font-sans font-semibold text-[18px] text-center inline-block transition hover:brightness-95 "
            >
              Cadastro
            </Link>
          </div>
        </div>
      </main>
      <div className="w-full h-100%">
        <Footer />
      </div>
    </div>
  );
}

export default Login;
