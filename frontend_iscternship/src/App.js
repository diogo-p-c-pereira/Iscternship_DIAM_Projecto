import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header.js';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { Routes, Route , useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import {useUserContext} from "./UserProvider";

import './Assets/App.css';

// Login , Signup, Logout
import Home from './Pages/Home';
import Login from './Pages/Login/Login.js';
import RegisterCandidato from './Pages/Candidato/RegistoCandidato/RegisterPageCandidate.js';
import RegisterEmpresa from './Pages/Empresa/RegistoEmpresa/RegisterPageCompany.js';

// Admin
import ListCandidates from './Pages/Admin/ListCandidates';
import DetailCandidates from './Pages/Admin/DetailCandidates';

// Candidato
import PerfilCandidato from './Pages/Candidato/PerfilCandidato/PerfilCandidatoPage.js';
import Candidatar from './Pages/Candidato/Candidatar'
import VagasCandidato from './Pages/Candidato/VerVagas/VagasCandidatoPage.js';

// Empresa
import VagasEmpresa from './Pages/Empresa/VagasEmpresa/VagasPageCompany.js';
import PerfilEmpresa from './Pages/Empresa/PerfilEmpresa/PerfilEmpresaPage.js';



function App() {
  // Use the useLocation hook to get the current location
  const location = useLocation();
  const { user } = useUserContext();


  return (
    <div className="App">
      <Header />
      <Navbar />
      <main className="main-content">
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegisterCandidato />} />
              <Route path="/companies" element={<RegisterEmpresa />} />
              <Route path="/listCandidates" element = {<ListCandidates />} />
              <Route path="/VagasEmpresa" element = {<VagasEmpresa />} />
              <Route path="/PerfilEmpresa" element = {<PerfilEmpresa />} />
              <Route path="/PerfilCandidato" element = {<PerfilCandidato />} />
              <Route path="/VagasCandidato" element = {<VagasCandidato />} />
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

