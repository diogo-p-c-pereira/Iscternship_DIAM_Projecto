import React, { useEffect, useState } from "react";
import { Table , Button } from "reactstrap";
import {useNavigate, Link} from "react-router-dom";
import axios from "axios";


function ListCandidates() {
  const URL_CANDIDATOS = "http://localhost:8000/db_iscternship/verCandidatos/"; // (1)
    const URL_DELETECANDIDATO = "http://localhost:8000/db_iscternship/deleteCandidato/";
    const [candidatosList, setCandidatosList] = useState([]); // (2)
      const navigate = useNavigate();

      const formatDate = (dateString) => {
          if (!dateString) {return("Nunca")}
    return new Date(dateString).toLocaleDateString("pt-PT", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
 });
};

  const getCandidatos = () => { // (3)
    axios.get(URL_CANDIDATOS)
      .then((request) => {
        setCandidatosList(request.data)
      }).catch(error => (alert(error)));
  };

  const [pesquisa, setPesquisa] = useState("");
const [candidatoDetalhe, setCandidatoDetalhe] = useState(null);

  useEffect(() => { // (4)
    getCandidatos();
  }, []);

  const apagarCandidato = (id) => {
      axios.delete(URL_DELETECANDIDATO + id).then(navigate(0))
  }


    const candidatosFiltrados = candidatosList.filter(c =>
        (c.user).username.toLowerCase().includes(pesquisa.trim().toLowerCase())
  );

  const cvLink = candidatoDetalhe?((candidatoDetalhe.cv && !candidatoDetalhe.cv.includes('empty.pdf'))
        ? (candidatoDetalhe.cv.startsWith('http')
            ? candidatoDetalhe.cv
            : `http://localhost:8000/${candidatoDetalhe.cv}`)
        : null): null;

    if (!candidatosList) return <p>A carregar dados...</p>;

  return (
      <div className="vagas-empresa-container">
          <div className="vagas-filtros">
              <input
                  type="text"
                  className="vagas-barra-pesquisa"
                  placeholder="Pesquisar candidato por username..."
                  value={pesquisa}
                  onChange={e => setPesquisa(e.target.value)}
              />
          </div>
          <div className="vagas-lista-box">
              {candidatosFiltrados.length === 0 ? (
                  <p style={{color: "#fff", textAlign: "center"}}>Sem candidatos para mostrar.</p>
              ) : (
                  candidatosFiltrados.map((c) => (
                      <div key={c.id} className="vaga-card">
                          <div className="vaga-info">
                              <div className="vaga-titulo">{c.user.first_name} {c.user.last_name}</div>
                              <div>Username: {c.user.username}</div>
                          </div>
                          <div className="vaga-botoes">
                              <button
                                  className="vaga-detalhes-btn"
                                  onClick={() => setCandidatoDetalhe(c)}
                              > Detalhes
                              </button>
                              <button
                                  className="vaga-remover-btn"
                                  onClick={() => apagarCandidato(c.id)}
                              > Remover
                              </button>
                          </div>
                      </div>
                  ))
              )}
          </div>
          {candidatoDetalhe && (
              <div className="vagas-modal-bg" onClick={() => setCandidatoDetalhe(null)}>
                  <div className="vagas-modal-form" onClick={e => e.stopPropagation()}>
                      <h2> {candidatoDetalhe.user.first_name} {candidatoDetalhe.user.last_name}</h2>
                      <div className="vaga-empresa-extra">
                          <img
                              src={
                                  candidatoDetalhe.candidato_imagem?.startsWith('http')
                                      ? candidatoDetalhe.candidato_imagem
                                      : `http://localhost:8000/${candidatoDetalhe.imagem}`
                              }
                              alt="Candidato"
                              className="vaga-empresa-img"
                          />
                          <div className="vaga-empresa-dados">
                              <div><strong>Username:</strong> {candidatoDetalhe.user.username}</div>
                              <div><strong>Email:</strong> {candidatoDetalhe.user.email}</div>
                              <div><strong>Telefone:</strong> {candidatoDetalhe.telefone}</div>
                          </div>
                      </div>
                      <strong>Descrição:</strong>
                      <div>
                          {candidatoDetalhe.descricao}
                      </div>
                      <br/>

                          <strong>Curriculum vitae:</strong>
                        <div>
                          {cvLink ? (
                    <a
                      href={cvLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#a3b6d9",
                        display: "block",
                        marginBottom: 6,
                        fontWeight: "bold"
                      }}
                    >
                      {candidatoDetalhe.cv.split('/').pop()}
                    </a>
                  ) : (
                    <span style={{ color: "#a3b6d9", fontSize: '0.95rem', marginBottom: 6 }}>
                      Nenhum CV enviado
                    </span>
                  )}
                      </div>
                      <br/>
                      <strong>Data de Registo:</strong>
                      <div>
                          {formatDate(candidatoDetalhe.user.date_joined)}
                      </div>
                      <br/>
                      <strong>Último login:</strong>
                      <div>
                          {formatDate(candidatoDetalhe.user.last_login)}
                      </div>
                      <br/>
                      <Button
                          type="button"
                          color="danger"
                          onClick={() => apagarCandidato(candidatoDetalhe.id)}
                      ><strong>Apagar</strong>
                      </Button>
                      <button
                          type="button"
                          className="register-button vagas-modal-fechar"
                          onClick={() => setCandidatoDetalhe(null)}
                      >Fechar
                      </button>
                  </div>
              </div>
          )}
      </div>);
}


export default ListCandidates;