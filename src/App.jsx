import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home/Home';
import FeedFotosItem from './components/Home/Feed/FeedFotosItem';
import Login from './components/Login/Login';
import Cadastro from './components/Login/Cadastro';

// Tem que tá na "const hideFooter" pra esconder o footer em certas Páginas 
// Ex: || location.pathname === '/Cadastro'; location.pathname === '/Página que Você quer esconder
// as "||" São pra separar as páginas

function AppContent() {
  const location = useLocation();
  const hideFooter = location.pathname === '/Login' || location.pathname === '/Cadastro';

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<FeedFotosItem />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Cadastro" element={<Cadastro />} />
      </Routes>

      {/* Esconde o Footer */}
      {!hideFooter && <Footer />}

    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
