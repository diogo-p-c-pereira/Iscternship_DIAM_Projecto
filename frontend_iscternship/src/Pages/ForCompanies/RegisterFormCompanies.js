import React, { useState } from 'react';
import '../../Assets/Styles/Pages/RegisterForms.css'; // Reutilizando o estilo existente

const ForCompanies = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    email: '',
    phone: '',
    password: '',
    description: '',
  });

  const [errors, setErrors] = useState({
    company_name: '',
    email: '',
    phone: '',
    password: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      company_name: '',
      email: '',
      phone: '',
      password: '',
      description: '',
    };

    if (!formData.company_name.trim()) {
      newErrors.company_name = 'O nome da empresa é obrigatório.';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'O email é obrigatório.';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'O email deve ser válido (ex: nome@dominio.pt).';
      valid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'O número de telefone é obrigatório.';
      valid = false;
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = 'O número de telefone deve conter apenas dígitos.';
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'A password é obrigatória.';
      valid = false;
    } else if (formData.password.length < 4) {
      newErrors.password = 'A password deve ter pelo menos 4 caracteres.';
      valid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'A descrição é obrigatória.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Formulário válido:', formData);
      // Fazer o fetch/axios para enviar os dados ao backend
    } else {
      console.log('Formulário inválido');
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
          <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} />
          {errors.company_name && <p className="error-message">{errors.company_name}</p>}
        </div>

        <div className="register-field">
          <label>Email</label>
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="register-field">
          <label>Telefone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
        </div>

        <div className="register-field">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <div className="register-field">
          <label>Descrição</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="3" />
          {errors.description && <p className="error-message">{errors.description}</p>}
        </div>

        <div className="register-button-container">
          <button type="submit" className="register-button">Registar</button>
        </div>
      </form>
    </div>
  );
};

export default ForCompanies;