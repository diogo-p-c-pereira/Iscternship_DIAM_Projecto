import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header.js';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { Routes, Route , useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import './Assets/App.css';

// Importar páginas individuais
import Home from './Pages/Home';
import Login from './Pages/Login/Login.js';
import Register from './Pages/ForCandidates/RegisterPageCandidate.js';
import ForCompanies from './Pages/ForCompanies/RegisterPageCompany.js';
import ListCandidates from './Pages/Admin/ListCandidates';
import DetailCandidates from './Pages/Admin/DetailCandidates';
import Candidatar from './Pages/ForCandidates/Candidatar'

function App() {
  // Use the useLocation hook to get the current location
  const location = useLocation();


  return (
    <div className="App">
      <Header />
      <Navbar />
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/companies" element={<ForCompanies />} />
            <Route path="/listCandidates" element = {<ListCandidates />} />
              <Route path="/detailCandidates/:candidatoId" element = {<DetailCandidates />} />
              <Route path="/Candidatar/:vagaId" element = {<Candidatar />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;

