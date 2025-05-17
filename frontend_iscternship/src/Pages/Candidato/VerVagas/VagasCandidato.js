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
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user.id;

  const [novaCandidatura, setNovaCandidatura] = useState();

  useEffect(() => {
    axios.get("http://localhost:8000/db_iscternship/vagas/")
      .then(res => setVagas(res.data || []))
      .catch(() => setVagas([]));
  }, []);

  const handleCriarCandidatura = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8000/db_iscternship/criarCandidatura/${userId}/`, novaCandidatura).then( () => {
        setCandidatado(true);
        setNovaCandidatura(null);
      })
      .catch(() => {
        alert("Erro ao criar candidatura!");
      });
  };


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
              <VagaDetalhes vagaDetalhe={vagaDetalhe} viewReviews={true}>
              <button
                  type="button"
                  className="register-button vagas-modal-fechar"
                  onClick={() => setVagaDetalhe(null)}
              >Fechar
              </button></VagaDetalhes></div>
          </div>
      )}
        {vagaCandidatar && (
            <div className="vagas-modal-bg" onClick={() => setVagaDetalhe(null)}>
                <div className="vagas-modal-form" onClick={e => e.stopPropagation()}>
                {!candidatado ? <>
                        <h2>Candidatar a: <br/></h2>
                        <h4>{vagaCandidatar.titulo}</h4>
                        <button
                            type="button"
                            className="register-button vagas-modal-fechar"
                            onClick={() => handleCriarCandidatura()}
                        >Submeter
                        </button>
                        <button
                            type="button"
                            className="register-button vagas-modal-fechar"
                            onClick={() => {setVagaCandidatar(null); setNovaCandidatura(null)}}
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
