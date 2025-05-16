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
import Home from './Pages/Home/HomePage';
import Login from './Pages/Login/Login.js';
import RegisterCandidato from './Pages/Candidato/RegistoCandidato/RegisterPageCandidate.js';
import RegisterEmpresa from './Pages/Empresa/RegistoEmpresa/RegisterPageCompany.js';

// Admin
import ListCandidatesPage from './Pages/Admin/ListCandidates/ListCandidatesPage';
import AnalisarVagasPage from './Pages/Admin/AnalisarVagas/AnalisarVagasPage';
import ListEmpresasPage from './Pages/Admin/ListEmpresas/ListEmpresasPage';

// Candidato
import PerfilCandidato from './Pages/Candidato/PerfilCandidato/PerfilCandidatoPage.js';
import VagasCandidato from './Pages/Candidato/VerVagas/VagasCandidatoPage.js';
import CandidaturasCandidatoPage from './Pages/Candidato/VerCandidaturas/CandidaturasCandidatoPage';

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
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={user?<Home/>:<Login />} />
              <Route path="/register" element={<RegisterCandidato />} />
              <Route path="/companies" element={<RegisterEmpresa />} />

              <Route path="/listCandidates" element = {user?(user.is_superuser?<ListCandidatesPage />:<Home/>): <Login/>} />
                <Route path="/listEmpresas" element = {user?(user.is_superuser?<ListEmpresasPage />:<Home/>): <Login/>} />
                 <Route path="/analisarVagas" element = {user?(user.is_superuser?<AnalisarVagasPage />:<Home/>): <Login/>} />

              <Route path="/VagasEmpresa" element = {user?(user.is_staff?<VagasEmpresa/>:<Home/>): <Login/>} />
              <Route path="/PerfilEmpresa" element = {user?(user.is_staff?<PerfilEmpresa />:<Home/>): <Login/>} />


              <Route path="/PerfilCandidato" element = {user?((user.is_staff || user.is_superuser)?<Home/>:<PerfilCandidato />): <Login/>} />
              <Route path="/VagasCandidato" element = {user?((user.is_staff || user.is_superuser)?<Home/>:<VagasCandidato />): <Login/>} />
                <Route path="/CandidaturasCandidato" element = {user?((user.is_staff || user.is_superuser)?<Home/>:<CandidaturasCandidatoPage />): <Login/>} />
            </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;

