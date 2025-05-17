// src/Components/CandidatoCard.js
import React from "react";

function CandidatoCard({ candidato, onDetalhesClick, onRemoverClick }) {
  return (
    <div className="vaga-card">
      <div className="vaga-info">
        <div className="vaga-titulo">{candidato.user.first_name} {candidato.user.last_name}</div>
        <div>Username: {candidato.user.username}</div>
      </div>
      <div className="vaga-botoes">
        <button className="vaga-detalhes-btn" onClick={() => onDetalhesClick(candidato)}>
          Detalhes
        </button>
        <button className="vaga-remover-btn" onClick={() => onRemoverClick(candidato.id)}>
          Remover
        </button>
      </div>
    </div>
  );
}

export default CandidatoCard;
