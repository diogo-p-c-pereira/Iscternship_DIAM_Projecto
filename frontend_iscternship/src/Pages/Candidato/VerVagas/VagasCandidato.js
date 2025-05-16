import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../Assets/Styles/Pages/Vagas.css";
import MapComponent from '../../MapComponent'

const VagasCandidato = () => {
  const [vagas, setVagas] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [vagaDetalhe, setVagaDetalhe] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/db_iscternship/vagas/")
      .then(res => setVagas(res.data || []))
      .catch(() => setVagas([]));
  }, []);

  const vagasFiltradas = vagas.filter(vaga =>
    vaga.titulo.toLowerCase().includes(pesquisa.trim().toLowerCase())
  );

  return (
    <div className="vagas-empresa-container">
      <div className="vagas-filtros">
        <input
          type="text"
          className="vagas-barra-pesquisa"
          placeholder="Pesquisar vaga por nome..."
          value={pesquisa}
          onChange={e => setPesquisa(e.target.value)}
        />
      </div>
      <div className="vagas-lista-box">
        {vagasFiltradas.length === 0 ? (
          <p className="vagas-sem-resultados">Sem vagas para mostrar.</p>
        ) : (
          vagasFiltradas.map((vaga) => (
            <div key={vaga.id} className="vaga-card">
              <div className="vaga-info">
                <div className="vaga-titulo">Nome da vaga: {vaga.titulo}</div>
                <div className="vaga-estado">Estado: {vaga.estado}</div>
              </div>
              <div className="vaga-botoes">
                <button
                  className="vaga-detalhes-btn"
                  onClick={() => setVagaDetalhe(vaga)}
                >Detalhes</button>
                <button
                  className="vaga-candidatar-btn"
                  onClick={() => alert("Funcionalidade de candidatura em breve!")}
                >Candidatar</button>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Modal Detalhes */}
      {vagaDetalhe && (
        <div className="vagas-modal-bg" onClick={() => setVagaDetalhe(null)}>
          <div className="vagas-modal-form" onClick={e => e.stopPropagation()}>
            <h2>{vagaDetalhe.titulo}</h2>
            <div>
              <strong>Estado:</strong> {vagaDetalhe.estado}
            </div>
            <div>
              <strong>Nº de candidatos:</strong> {vagaDetalhe.n_candidatos ?? 0}
            </div>
            <div className="vaga-empresa-extra">
              <img
                src={
                  vagaDetalhe.empresa_imagem?.startsWith('http')
                    ? vagaDetalhe.empresa_imagem
                    : `http://localhost:8000/${vagaDetalhe.empresa_imagem}`
                }
                alt="Empresa"
                className="vaga-empresa-img"
              />
              <div className="vaga-empresa-dados">
                <div><strong>Empresa:</strong> {vagaDetalhe.empresa_nome}</div>
                <div><strong>Morada:</strong> {vagaDetalhe.empresa_morada}</div>
                <div><strong>Telefone:</strong> {vagaDetalhe.empresa_telefone}</div>
              </div>
            </div>
            <div className="vaga-descricao-detalhe">
              <strong>Descrição:</strong>
              <div className="vaga-descricao-box">
                {vagaDetalhe.descricao}
              </div>
            </div>
              <MapComponent address={vagaDetalhe.empresa_morada} />
            <button
              type="button"
              className="register-button vagas-modal-fechar"
              onClick={() => setVagaDetalhe(null)}
            >Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VagasCandidato;
