// src/Components/ModalEditarVaga.js
import React from "react";

function ModalEditarVaga({ editVaga, setEditVaga, onClose, onSubmit }) {
  return (
    <div className="vagas-modal-bg">
      <form className="vagas-modal-form" onSubmit={onSubmit}>
        <h2>Editar vaga</h2>
        <div className="register-field">
          <label>Título</label>
          <input type="text" value={editVaga.titulo}
            onChange={e => setEditVaga(v => ({ ...v, titulo: e.target.value }))} required />
        </div>
        <div className="register-field">
          <label>Descrição</label>
          <textarea value={editVaga.descricao}
            onChange={e => setEditVaga(v => ({ ...v, descricao: e.target.value }))} required />
        </div>
        <div className="register-field">
          <label>Estado</label>
          <select
            className="vagas-estado-dropdown"
            value={editVaga.estado}
            onChange={e => setEditVaga(v => ({ ...v, estado: e.target.value }))}
          >
            <option value="Aberta">Aberta</option>
            <option value="Fechada">Fechada</option>
          </select>
        </div>
        <div className="register-button-container">
          <button type="button" className="register-button" style={{ background: "#8999c5" }} onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="register-button">Guardar</button>
        </div>
      </form>
    </div>
  );
}

export default ModalEditarVaga;
