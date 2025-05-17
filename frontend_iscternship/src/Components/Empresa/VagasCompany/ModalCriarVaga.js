import React from "react";

function ModalCriarVaga({ novaVaga, setNovaVaga, onClose, onSubmit }) {
  return (
    <div className="vagas-modal-bg">
      <form className="vagas-modal-form" onSubmit={onSubmit}>
        <h2>Criar nova vaga</h2>
        <div className="register-field">
          <label>Título</label>
          <input type="text" value={novaVaga.titulo} required onChange={e => setNovaVaga(v => ({ ...v, titulo: e.target.value }))} />
        </div>
        <div className="register-field">
          <label>Descrição</label>
          <textarea value={novaVaga.descricao} required onChange={e => setNovaVaga(v => ({ ...v, descricao: e.target.value }))} />
        </div>
        <div className="register-field">
          <label>Estado</label>
          <select
            className="vagas-estado-dropdown"
            value={novaVaga.estado}
            onChange={e => setNovaVaga(v => ({ ...v, estado: e.target.value }))}
          >
            <option value="Aberta">Aberta</option>
            <option value="Fechada">Fechada</option>
          </select>
        </div>
        <div className="register-button-container">
          <button type="button" className="register-button" style={{ background: "#8999c5" }} onClick={onClose}>Cancelar</button>
          <button type="submit" className="register-button">Criar</button>
        </div>
      </form>
    </div>
  );
}

export default ModalCriarVaga;
