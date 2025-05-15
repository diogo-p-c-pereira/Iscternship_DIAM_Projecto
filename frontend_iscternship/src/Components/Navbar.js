import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Assets/Styles/Components/NavBar.css';
import { motion } from 'framer-motion';
import {useUserContext} from "../UserProvider";
import handleLogout from '../UserProvider';
import axios from 'axios';

const routes = [
  { path: '/', label: 'Home' },
  { path: '/login', label: 'Login' },
  { path: '/register', label: 'For Candidates' },
  { path: '/companies', label: 'For Companies' },
];

const routesCandidato = [
    { path: '/', label: 'Home' },
  { path: '/VagasCandidato', label: 'Vagas' },
  { path: '/PerfilCandidato', label: 'Perfil' },
]

const routesEmpresa = [
    { path: '/', label: 'Home' },
  { path: '/VagasEmpresa', label: 'Vagas' },
  { path: '/PerfilEmpresa', label: 'Perfil' },
]

const routesAdmin = [
    { path: '/', label: 'Home' },
  { path: '/listCandidates', label: 'Candidatos' },
]


const Navbar = () => {
  const {user, setUser} = useUserContext();
  const r = user? (user.is_superuser || user.is_staff ? (user.is_staff? routesEmpresa : routesAdmin) : routesCandidato ) : routes;
  const handleLogout = async () => {
        await axios.post('http://localhost:8000/db_iscternship/logout/');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

  return (
      <nav className="navbar navbar-expand-lg justify-content-center custom-navbar">
          <ul className="navbar-nav nav-container">
              {r.map((route) => (
                  <li className="nav-item px-3" key={route.path}>
                      <NavLink
                          to={route.path}
                          className={({isActive}) => `nav-button ${isActive ? 'active' : ''}`}
                      >
                          {({isActive}) => (
                              <>
                                  {isActive && (
                                      <motion.div
                                          layoutId="nav-underline"
                                          className="nav-active-bg"
                                          transition={{type: 'spring', stiffness: 400, damping: 30}}
                                      />
                                  )}
                                  <span className="nav-label">{route.label}</span>
                              </>
                          )}
                      </NavLink>
                  </li>
              ))}
          </ul>
          {user?<button type="button" className="register-button" style={{background: '#c94a4a'}} onClick={handleLogout}>
              Logout
          </button>: null}
      </nav>
  );
};

export default Navbar;
