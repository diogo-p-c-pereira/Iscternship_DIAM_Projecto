// src/Components/FormPerfilCandidato.js
import React from "react";

function FormPerfilCandidato({ formData, handleChange }) {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <div style={{ flex: 1 }}>
        <div className="register-field">
          <label>Username</label>
          <input type="text" name="username" value={formData.user.username} disabled />
        </div>
        <div className="register-field">
          <label>Primeiro Nome</label>
          <input type="text" name="first_name" value={formData.user.first_name} onChange={handleChange} />
        </div>
        <div className="register-field">
          <label>Último Nome</label>
          <input type="text" name="last_name" value={formData.user.last_name} onChange={handleChange} />
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div className="register-field">
          <label>Email</label>
          <input type="email" name="email" value={formData.user.email} onChange={handleChange} />
        </div>
        <div className="register-field">
          <label>Telefone</label>
          <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} />
        </div>
        <div className="register-field">
          <label>Descrição</label>
          <textarea name="descricao" rows="3" value={formData.descricao} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}

export default FormPerfilCandidato;
