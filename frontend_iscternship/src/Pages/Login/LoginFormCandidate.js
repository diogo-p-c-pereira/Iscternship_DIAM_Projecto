import React, { useState } from 'react';
import '../../Assets/Styles/Pages/LoginFormCandidate.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      username: '',
      password: ''
    };

    if (!formData.username.trim()) {
      newErrors.username = 'O username é obrigatório.';
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'A password é obrigatória.';
      valid = false;
    } else if (formData.password.length < 4) {
      newErrors.password = 'A password deve ter pelo menos 4 caracteres.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Login válido:', formData);
      // Aqui podes chamar fetch/axios para autenticar
    } else {
      console.log('Login inválido');
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h3 className="login-title">Login</h3>

        <div className="login-field">
          <label>Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
          {errors.username && <p className="error-message">{errors.username}</p>}
        </div>
        <br />
        <div className="login-field">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <div className="login-button-container">
          <button type="submit" className="login-button">Entrar</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;