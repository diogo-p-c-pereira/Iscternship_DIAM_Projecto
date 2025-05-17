import React from "react";
import { useNavigate } from "react-router-dom";


function VagaCardEmpresa({ vaga, onDetalhesClick, onRemoverClick }) {

  const navigate = useNavigate();

  return (
    <div className="vaga-card">
      <div className="vaga-info">
        <div className="vaga-titulo">Nome da vaga: {vaga.titulo}</div>
        <div>Estado: {vaga.estado}</div>
        <div>Nº de candidatos: {vaga.n_candidatos ?? 0}</div>
      </div>
      <div className="vaga-botoes">

        <button
          className="vaga-detalhes-btn"
          onClick={() => navigate(`/VagasEmpresa/${vaga.id}/candidatos`)}
>       
          Ver Candidatos
        </button>

        <button
          className="vaga-detalhes-btn"
          onClick={() => onDetalhesClick(vaga)}
        >
          Detalhes
        </button>
        
        <button
          className="vaga-remover-btn"
          onClick={() => onRemoverClick(vaga.id)}
        >
          Remover
        </button>
      </div>
    </div>
  );
}

export default VagaCardEmpresa;
