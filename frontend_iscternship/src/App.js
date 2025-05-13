import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header.js';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import ListarCandidatos from './Pages/Admin/ListarCandidatos';
import { Routes, Route } from 'react-router-dom';

import './Assets/App.css';

// Importar páginas individuais
import Home from './Pages/Home';
import Login from './Pages/Login/Login.js';
import Register from './Pages/Register/Register.js';
import ForCompanies from './Pages/ForCompanies';

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/companies" element={<ForCompanies />} />
            <Route path="/listarCandidatos" element = {<ListarCandidatos />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

