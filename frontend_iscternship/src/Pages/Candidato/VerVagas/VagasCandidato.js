import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../Assets/Styles/Pages/Vagas.css";
import VagaDetalhes from "../../../Components/Candidato/VagasCandidato/VagaDetalhes";
import ModalCandidatar from "../../../Components/Candidato/VagasCandidato/ModalCandidatar";

const VagasCandidato = () => {
  const [vagas, setVagas] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [vagaDetalhe, setVagaDetalhe] = useState(null);
  const [vagaCandidatar, setVagaCandidatar] = useState(null);
  const [candidatado, setCandidatado] = useState(null);
  const [me, setMe] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  const [novaCandidatura, setNovaCandidatura] = useState();

  useEffect(() => {
  if (vagaCandidatar) {
    axios.get(`http://localhost:8000/db_iscternship/candidato/${userId}`)
      .then(res => setMe(res.data))
      .catch(() => setMe(null));
  }
}, [vagaCandidatar, userId]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/db_iscternship/vagas/")
      .then((res) => setVagas(res.data || []))
      .catch(() => setVagas([]));
  }, []);

  const handleCriarCandidatura = () => {
    axios
      .post(
        `http://localhost:8000/db_iscternship/criarCandidatura/${userId}/${vagaCandidatar.id}`,
        novaCandidatura
      )
      .then(() => {
        setCandidatado(true);
        setNovaCandidatura(null);
      })
      .catch(() => {
        alert("Erro ao criar candidatura!");
      });
  };

  const resetCandidatura = () => {
    setVagaCandidatar(null);
    setNovaCandidatura(null);
    setCandidatado(null);
  };

  const vagasFiltradas = vagas.filter((vaga) =>
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
          onChange={(e) => setPesquisa(e.target.value)}
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
                >
                  Detalhes
                </button>
                <button
                  className="vaga-candidatar-btn"
                  onClick={() => setVagaCandidatar(vaga)}
                >
                  Candidatar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {vagaDetalhe && (
        <div className="vagas-modal-bg" onClick={() => setVagaDetalhe(null)}>
          <div className="vagas-modal-form" onClick={(e) => e.stopPropagation()}>
            <VagaDetalhes vagaDetalhe={vagaDetalhe} viewReviews={true}>
              <button
                type="button"
                className="register-button vagas-modal-fechar"
                onClick={() => setVagaDetalhe(null)}
              >
                Fechar
              </button>
            </VagaDetalhes>
          </div>
        </div>
      )}

      {vagaCandidatar && (
        <ModalCandidatar
          vaga={vagaCandidatar}
          candidatado={candidatado}
          onSubmit={handleCriarCandidatura}
          onClose={() => setVagaDetalhe(null)}
          onReset={resetCandidatura}
          candidato={me}
        />
      )}
      <br />
      <br />
    </div>
  );
};

export default VagasCandidato;
