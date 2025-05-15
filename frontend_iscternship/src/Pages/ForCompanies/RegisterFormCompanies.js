import React, { useState } from 'react';
import '../../Assets/Styles/Pages/RegisterForms.css';
import axios from 'axios';

const ForCompanies = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    morada: '',
    descricao: '',
    telefone: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    morada: '',
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
      email: '',
      password: '',
      morada: '',
      descricao: '',
      telefone: ''
    };

    if (!formData.username.trim()) {
      newErrors.username = 'O nome da Empresa é obrigatório.';
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

    if (!formData.morada.trim()) {
      newErrors.morada = 'A morada é obrigatória.';
      valid = false;
    }

    if (!formData.descricao.trim()) {
      newErrors.descricao = 'A descrição é obrigatória.';
      valid = false;
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'O telemóvel é obrigatório.';
      valid = false;
    } else if (!/^[0-9]+$/.test(formData.telefone)) {
      newErrors.telefone = 'O telemóvel deve conter apenas números.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const dataToSend = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      nome_empresa: formData.username,
      morada: formData.morada,
      telefone: formData.telefone
    };

    try {
      await axios.post('http://localhost:8000/db_iscternship/signupEmpresa/', dataToSend);
      alert('Empresa registada com sucesso!');
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
        <h2 className="register-title">Registo de Empresa</h2>
        <p className="register-description">
          Registe-se como empresa e aguarde a autenticação do seu registo. Após a autenticação, poderá publicar vagas para estágios.
        </p>

        <div className="register-field">
          <label>Nome da Empresa</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
          {errors.username && <p className="error-message">{errors.username}</p>}
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
          <label>Morada</label>
          <input type="text" name="morada" value={formData.morada} onChange={handleChange} />
          {errors.morada && <p className="error-message">{errors.morada}</p>}
        </div>

        <div className="register-field">
          <label>Telemóvel</label>
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

export default ForCompanies;
