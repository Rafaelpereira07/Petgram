import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import db from '../../../db.json';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !email.trim() || !password.trim()) {
      setError('Preencha todos os campos.');
      return;
    }

    const dbUsers = Array.isArray(db.users) ? db.users : [];
    const local = JSON.parse(localStorage.getItem('petgram_users') || '[]');

    const exists = [...dbUsers, ...local].some(u => u.username === username || u.email === email);
    if (exists) {
      setError('Usuário ou e-mail já cadastrado.');
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password // em produção NÃO armazene em texto simples
    };

    const updated = [...local];
    updated.unshift(newUser);
    localStorage.setItem('petgram_users', JSON.stringify(updated));

    // logar automaticamente (salva sessão em petgram_user)
    const safeUser = { id: newUser.id, username: newUser.username, email: newUser.email };
    localStorage.setItem('petgram_user', JSON.stringify(safeUser));

    navigate('/');
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-white px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Cadastro</h2>

        {error && <div className="text-red-600 mb-3">{error}</div>}

        <input
          className="w-full mb-3 p-3 border rounded"
          placeholder="Usuário"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
          className="w-full mb-3 p-3 border rounded"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-3 p-3 border rounded"
          placeholder="Senha"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="w-full bg-green-500 text-white py-3 rounded mb-2" type="submit">Cadastrar</button>

        <div className="text-sm text-center">
          Já tem conta? <Link to="/login" className="text-blue-600">Entrar</Link>
        </div>
      </form>
    </main>
  );
}
