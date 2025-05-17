// src/Components/ModalReview.js
import React from "react";

function ModalReview({ cReview, novaReview, onChangeComentario, onSubmit, onClose }) {
  return (
    <div className="vagas-modal-bg" onClick={onClose}>
      <div className="vagas-modal-form" onClick={(e) => e.stopPropagation()}>
        <div className="register-field">
          <h2>Review: {cReview.vaga.empresa.nome_empresa}</h2>
          <label>Comentário:</label>
          <textarea
            value={novaReview.comentario}
            required
            onChange={(e) => onChangeComentario(e.target.value)}
          />
        </div>
        <button type="button" className="register-button vagas-modal-fechar" onClick={onSubmit}>
          Submeter
        </button>
        <button type="button" className="register-button vagas-modal-fechar" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}

export default ModalReview;
