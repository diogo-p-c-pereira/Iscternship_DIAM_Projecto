import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../Assets/Styles/Pages/Vagas.css";
import LLM_Component from "../../../Components/LLM_Component"
import VagaDetalhes from "../../../Components/VagaDetalhes"

const VagasCandidato = () => {
  const [vagas, setVagas] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [vagaDetalhe, setVagaDetalhe] = useState(null);
  const [vagaCandidatar, setVagaCandidatar] = useState(null);
  const [candidatado, setCandidatado] = useState(null);

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
                  onClick={() => setVagaCandidatar(vaga)}
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
              <VagaDetalhes vagaDetalhe={vagaDetalhe} />
              <button
                  type="button"
                  className="register-button vagas-modal-fechar"
                  onClick={() => setVagaDetalhe(null)}
              >Fechar
              </button></div>
          </div>
      )}
        {vagaCandidatar && (
            <div className="vagas-modal-bg" onClick={() => setVagaDetalhe(null)}>
                <div className="vagas-modal-form" onClick={e => e.stopPropagation()}>
                {!candidatado ? <>
                        <h2>{vagaCandidatar.titulo}</h2>
                        <button
                            type="button"
                            className="register-button vagas-modal-fechar"
                            onClick={() => setCandidatado(true)/*Post candidatura + ativar LLM*/}
                        >Submeter
                        </button>
                        <button
                            type="button"
                            className="register-button vagas-modal-fechar"
                            onClick={() => setVagaCandidatar(null)}
                        >Cancelar
                        </button>
                    </>
                    : <><h2>Candidatura Enviada!</h2>
                        <LLM_Component vaga_info={JSON.stringify(vagaCandidatar, null, 2)} cv_path={"cv_files/CV_DiogoPereira.pdf"}/>
                        <button
                            type="button"
                            className="register-button vagas-modal-fechar"
                            onClick={() => {setVagaCandidatar(null); setCandidatado(null);}}
                        >Fechar
                        </button>
                    </>}
            </div>
        </div>
        )}
    </div>
  );
};

export default VagasCandidato;
