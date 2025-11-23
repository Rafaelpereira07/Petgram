import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home/Home';
import FeedFotosItem from './components/Home/Feed/FeedFotosItem';
import Login from './components/Login/Login';
import Cadastro from './components/Login/Cadastro';
import UserFotos from './components/User/UserFotos';
import UserPost from './components/User/UserPost';
import UserCard from './components/User/UserCard';

function AppContent() {
  const location = useLocation();
  const hideFooter = location.pathname === '/Login' || location.pathname === '/Cadastro';

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("petgram_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<FeedFotosItem />} />
        <Route path="/Login" element={<Login setUser={setUser} />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/user/fotos" element={<UserFotos user={user} />} />
        <Route path="/user/post" element={<UserPost user={user} />} />
        <Route path="/user/card" element={<UserCard user={user} />} />
        
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
