import React from "react";

function FiltroPesquisa({ pesquisa, setPesquisa }) {
  return (
    <div className="vagas-filtros">
      <input
        type="text"
        className="vagas-barra-pesquisa"
        placeholder="Pesquisar vaga por nome..."
        value={pesquisa}
        onChange={e => setPesquisa(e.target.value)}
      />
    </div>
  );
}

export default FiltroPesquisa;
