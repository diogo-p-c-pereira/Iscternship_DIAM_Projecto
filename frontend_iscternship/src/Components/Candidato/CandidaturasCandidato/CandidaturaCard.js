// src/Components/CandidaturaCard.js
import React from "react";

function CandidaturaCard({ candidatura, onDetalhesClick, onReviewClick }) {
  return (
    <div className="vaga-card">
      <div className="vaga-info">
        <div className="vaga-titulo">Candidatura: {candidatura.vaga.titulo}</div>
        <div className="vaga-estado">Estado: {candidatura.estado}</div>
      </div>
      <div className="vaga-botoes">
        <button className="vaga-detalhes-btn" onClick={() => onDetalhesClick(candidatura)}>
          Detalhes
        </button>
        {candidatura.estado === "Aceite" && (
          <button className="vaga-detalhes-btn" onClick={() => onReviewClick(candidatura)}>
            Review
          </button>
        )}
      </div>
    </div>
  );
}

export default CandidaturaCard;
