import React from "react";

function VagaCardAdmin({ vaga, onDetalhesClick, onRemoverClick }) {
  return (
    <div className="vaga-card">
      <div className="vaga-info">
        <div className="vaga-titulo">Nome da vaga: {vaga.titulo}</div>
        <div className="vaga-estado">Estado: {vaga.estado}</div>
        <div className="vaga-estado">Reportada: {vaga.isReportada ? "Sim" : "Não"}</div>
      </div>
      <div className="vaga-botoes">
        <button className="vaga-detalhes-btn" onClick={() => onDetalhesClick(vaga)}>
          Detalhes
        </button>
        <button className="vaga-remover-btn" onClick={() => onRemoverClick(vaga.id)}>
          Remover
        </button>
      </div>
    </div>
  );
}

export default VagaCardAdmin;
