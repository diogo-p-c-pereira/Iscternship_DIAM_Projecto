import React from "react";

function FiltroEstado({ estadoFiltro, setEstadoFiltro, onCriarClick }) {
  return (
    <div className="vagas-filtros">
      <select
        value={estadoFiltro}
        onChange={e => setEstadoFiltro(e.target.value)}
        className="vagas-estado-dropdown"
      >
        <option value="">Todos os estados</option>
        <option value="Aberta">Aberta</option>
        <option value="Fechada">Fechada</option>
      </select>
      <button
        className="vagas-criar-btn"
        onClick={onCriarClick}
      >
        Criar Vaga
      </button>
    </div>
  );
}

export default FiltroEstado;
