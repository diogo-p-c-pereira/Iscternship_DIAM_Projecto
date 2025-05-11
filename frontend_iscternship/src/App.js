import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header.js';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { Routes, Route } from 'react-router-dom';

// Importar páginas individuais
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
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
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

