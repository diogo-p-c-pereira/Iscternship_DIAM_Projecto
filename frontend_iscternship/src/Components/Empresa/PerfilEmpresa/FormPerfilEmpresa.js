import React from "react";

function FormPerfilEmpresa({ formData, handleChange }) {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <div style={{ flex: 1 }}>
        <div className="register-field">
          <label>Username</label>
          <input type="text" name="username" value={formData.user.username} disabled />
        </div>
        <div className="register-field">
          <label>Email</label>
          <input type="email" name="email" value={formData.user.email} onChange={handleChange} />
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div className="register-field">
          <label>Nome da Empresa</label>
          <input type="text" name="nome_empresa" value={formData.nome_empresa} onChange={handleChange} />
        </div>
        <div className="register-field">
          <label>Morada</label>
          <input type="text" name="morada" value={formData.morada} onChange={handleChange} />
        </div>
        <div className="register-field">
          <label>Telefone</label>
          <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}

export default FormPerfilEmpresa;
