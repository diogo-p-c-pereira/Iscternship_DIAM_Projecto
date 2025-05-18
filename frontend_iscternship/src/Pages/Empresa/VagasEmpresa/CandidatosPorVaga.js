// src/Pages/Empresa/VagasCompany/CandidatosPorVaga.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../../../Assets/Styles/Pages/Vagas.css";
import CandidaturaDetalhes from "../../../Components/Candidato/CandidaturasCandidato/CandidaturaDetalhes";

function CandidatosPorVaga() {
  const { vagaId } = useParams();
  const navigate = useNavigate();
  const [candidaturas, setCandidaturas] = useState([]);
  const [candidaturaDetalhe, setCandidaturaDetalhe] = useState(null);

  const handleEstadoChange = (candidaturaId, novoEstado) => {
  axios
    .post(`http://localhost:8000/db_iscternship/atualizarEstadoCandidatura/${candidaturaId}/`, {
      estado: novoEstado
    })
    .then(() => {
      // Atualiza localmente o estado no array
      setCandidaturas(prev =>
        prev.map(c =>
          c.id === candidaturaId ? { ...c, estado: novoEstado } : c
        )
      );
    })
    .catch(() => alert("Erro ao atualizar estado da candidatura."));
};


  useEffect(() => {
    axios
      .get(`http://localhost:8000/db_iscternship/candidatosPorVaga/${vagaId}/`)
      .then((res) => { console.log(res.data);
      setCandidaturas(res.data || []);
     })
      .catch(() => setCandidaturas([]));
  }, [vagaId]);

  return (
    <div className="vagas-empresa-container">
      <h2 className="register-title">Candidatos para a Vaga { vagaId } </h2>
      <button
        className="register-button"
        style={{ width: "fit-content", marginBottom: 20 }}
        onClick={() => navigate(-1)}
      >
        Voltar
      </button>

      <div className="vagas-lista-box">
        {candidaturas.length === 0 ? (
          <p style={{ color: "#fff", textAlign: "center" }}>
            Nenhum candidato para esta vaga.
          </p>
        ) : (
          candidaturas.map((c) => (
            <div key={c.id} className="vaga-card">
              <div className="vaga-info">
                <div className="vaga-titulo">
                  {c.candidato.user.first_name} {c.candidato.user.last_name}
                </div>
                  Email: {c.candidato.user.email} <br/>
                  Telefone: {c.candidato.telefone}
                <div className="vaga-estado">Estado: {c.estado}
                      <select
                        value={c.estado}
                        onChange={(e) => handleEstadoChange(c.id, e.target.value)}
                        className="vagas-estado-dropdown"
                        style={{ marginLeft: 8 }}
                      >
                      <option value="Pendente">Pendente</option>
                      <option value="Em Processamento">Em Processamento</option>
                      <option value="Aceite">Aceite</option>
                      <option value="Rejeitada">Rejeitada</option>
                    </select>
                </div>
              </div>
              <div className="vaga-botoes">
                <button
                  className="vaga-detalhes-btn"
                  onClick={() => setCandidaturaDetalhe(c)}
                >
                  Detalhes
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {candidaturaDetalhe && (
        <div className="vagas-modal-bg" onClick={() => setCandidaturaDetalhe(null)}>
          <div className="vagas-modal-form" onClick={(e) => e.stopPropagation()}>
            <CandidaturaDetalhes cDetalhe={candidaturaDetalhe} />
            <button
              type="button"
              className="register-button vagas-modal-fechar"
              onClick={() => setCandidaturaDetalhe(null)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CandidatosPorVaga;
