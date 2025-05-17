// src/Components/ModalCandidatar.js
import React from "react";
import LLM_Component from "./LLM_CVreview/LLM_Component";

const ModalCandidatar = ({
  vaga,
  candidatado,
  onSubmit,
  onClose,
  onReset,
  candidato
}) => {
  return (
    <div className="vagas-modal-bg" onClick={onClose}>
      <div className="vagas-modal-form" onClick={(e) => e.stopPropagation()}>
        {!candidatado ? (
          <>
            <h2>Candidatar a:</h2>
            <h4>{vaga.titulo}</h4>
            <button
              type="button"
              className="register-button vagas-modal-fechar"
              onClick={onSubmit}
            >
              Submeter
            </button>
            <button
              type="button"
              className="register-button vagas-modal-fechar"
              onClick={onReset}
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <h2>Candidatura Enviada!</h2>
            <LLM_Component
              vaga_info={JSON.stringify(vaga, null, 2)}
              cv_path={candidato.cv}
            />
            <button
              type="button"
              className="register-button vagas-modal-fechar"
              onClick={onReset}
            >
              Fechar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalCandidatar;
