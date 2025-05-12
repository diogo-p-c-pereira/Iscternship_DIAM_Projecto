// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Assets/Styles/Components/NavBar.css';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg justify-content-center custom-navbar">
    <ul className="navbar-nav">
      <li className="nav-item px-3">
        <Link to="/" className="btn nav-button">Home</Link>
      </li>
      <li className="nav-item px-3">
        <Link to="/login" className="btn nav-button">Login</Link>
      </li>
      <li className="nav-item px-3">
        <Link to="/register" className="btn nav-button">Register</Link>
      </li>
      <li className="nav-item px-3">
        <Link to="/companies" className="btn nav-button">For Companies</Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
