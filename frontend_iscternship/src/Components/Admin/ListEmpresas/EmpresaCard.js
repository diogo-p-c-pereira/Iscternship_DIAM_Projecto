import React from "react";

function EmpresaCard({ empresa, onDetalhesClick, onRemoverClick }) {
  return (
    <div className="vaga-card">
      <div className="vaga-info">
        <div className="vaga-titulo">{empresa.nome_empresa}</div>
        <div>Username: {empresa.user.username}</div>
        <div>Aprovada: {empresa.is_approved ? "Sim" : "Não"}</div>
      </div>
      <div className="vaga-botoes">
        <button className="vaga-detalhes-btn" onClick={() => onDetalhesClick(empresa)}>
          Detalhes
        </button>
        <button className="vaga-remover-btn" onClick={() => onRemoverClick(empresa.id)}>
          Remover
        </button>
      </div>
    </div>
  );
}

export default EmpresaCard;
