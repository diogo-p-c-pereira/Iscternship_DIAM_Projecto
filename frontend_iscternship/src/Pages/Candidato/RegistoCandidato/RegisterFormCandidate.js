import React, { useState } from 'react';
import {useParams, useNavigate, Link} from "react-router-dom";
import '../../../Assets/Styles/Pages/RegisterForms.css';
import axios from 'axios';


const RegisterForm = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    descricao: '',
    telefone: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    descricao: '',
    telefone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      descricao: '',
      telefone: ''
    };

    if (!formData.username.trim()) {
      newErrors.username = 'O username é obrigatório.';
      valid = false;
    }

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'O primeiro nome é obrigatório.';
      valid = false;
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'O último nome é obrigatório.';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'O email é obrigatório.';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'O email deve ser válido.';
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'A password é obrigatória.';
      valid = false;
    } else if (formData.password.length < 4) {
      newErrors.password = 'A password deve ter pelo menos 4 caracteres.';
      valid = false;
    }

    if (!formData.descricao.trim()) {
      newErrors.descricao = 'A descrição é obrigatória.';
      valid = false;
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'O telefone é obrigatório.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post('http://localhost:8000/db_iscternship/signupCandidato/', formData);
      alert('Candidato registado com sucesso!');
      navigate('/login');
    } catch (error) {
      if (error.response?.data?.error) {
        alert(`Erro ao registar: ${error.response.data.error}`);
      } else {
        alert('Erro ao registar: Erro desconhecido.');
      }
    }
  };

  return (
    <div className="register-container">
      <form className="register-box" onSubmit={handleSubmit}>
        <h2 className="register-title">Registo</h2>
        <p className="register-description">
          Registe-se como candidato — Cria a tua conta para poder candidatar-te às vagas disponíveis aqui no Iscternship!
        </p>

        <div className="register-field">
          <label>Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
          {errors.username && <p className="error-message">{errors.username}</p>}
        </div>

        <div className="register-field">
          <label>Primeiro Nome</label>
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
          {errors.first_name && <p className="error-message">{errors.first_name}</p>}
        </div>

        <div className="register-field">
          <label>Último Nome</label>
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
          {errors.last_name && <p className="error-message">{errors.last_name}</p>}
        </div>

        <div className="register-field">
          <label>Email</label>
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="register-field">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <div className="register-field">
          <label>Telefone</label>
          <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} />
          {errors.telefone && <p className="error-message">{errors.telefone}</p>}
        </div>

        <div className="register-field">
          <label>Descrição</label>
          <textarea name="descricao" rows="3" value={formData.descricao} onChange={handleChange} />
          {errors.descricao && <p className="error-message">{errors.descricao}</p>}
        </div>

        <div className="register-button-container">
          <button type="submit" className="register-button">Registar</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
