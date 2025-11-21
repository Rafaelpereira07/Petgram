import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './Home';
import Fotos from './components/Fotos';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Cadastro from './Cadastro';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Fotos />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Cadastro" element={<Cadastro />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
