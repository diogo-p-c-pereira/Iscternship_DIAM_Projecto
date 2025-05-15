import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Assets/Styles/Components/NavBar.css';
import { motion } from 'framer-motion';
import {useUserContext} from "../UserProvider";



const routes = [
  { path: '/', label: 'Home' },
  { path: '/login', label: 'Login' },
  { path: '/register', label: 'For Candidates' },
  { path: '/companies', label: 'For Companies' },
];

const routesCandidato = [
  { path: '/LoginSucesso', label: 'Vagas' },
  { path: '/', label: 'Candidaturas' },
  { path: '/PerfilCandidato', label: 'Perfil' },
]

const Navbar = () => {
  const {user, setUser} = useUserContext();
  const r = user? routesCandidato : routes

  return (
    <nav className="navbar navbar-expand-lg justify-content-center custom-navbar">
      <ul className="navbar-nav nav-container">
        {r.map((route) => (
          <li className="nav-item px-3" key={route.path}>
            <NavLink
              to={route.path}
              className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="nav-active-bg"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="nav-label">{route.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
