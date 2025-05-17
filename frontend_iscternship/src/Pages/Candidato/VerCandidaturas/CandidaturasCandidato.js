import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../Assets/Styles/Pages/Vagas.css";
import {useNavigate} from "react-router-dom";
import { Button } from "reactstrap";
import VagaDetalhes from '../../../Components/VagaDetalhes';
import {useUserContext} from "../../../UserProvider";


function CandidaturasCandidato() {
  const {user, setUser} = useUserContext();
  const userId = user.id;
  const [candidaturas, setCandidaturas] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [cReview, setCReview] = useState();
  const [cDetalhe, setCDetalhe] = useState();
  const navigate = useNavigate();
  const [novaReview, setNovaReview] = useState({comentario: "",});



  useEffect(() => {
    axios.get("http://localhost:8000/db_iscternship/candidaturasCandidato/" + user.id)
        .then(res => setCandidaturas(res.data || []))
      .catch(() => setCandidaturas([]));
  }, []);


  const handleCriarReview= (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8000/db_iscternship/criarReview/${userId}/${cReview.vaga.empresa.id}`, novaReview)
      .then(() => {
        setCReview(false);
        setNovaReview(null);
      })
      .catch(() => {
        alert("Erro ao criar review!");
      });
  };

  const candidaturasFiltradas = candidaturas.filter(c =>
    c.vaga.titulo.toLowerCase().includes(pesquisa.trim().toLowerCase())
  );

  return (
    <div className="vagas-empresa-container">
      <div className="vagas-filtros">
        <input
          type="text"
          className="vagas-barra-pesquisa"
          placeholder="Pesquisar candidatura por titulo..."
          value={pesquisa}
          onChange={e => setPesquisa(e.target.value)}
        />
      </div>
      <div className="vagas-lista-box">
        {candidaturasFiltradas.length === 0 ? (
          <p className="vagas-sem-resultados">Sem candidaturas para mostrar.</p>
        ) : (
          candidaturasFiltradas.map((c) => (
            <div key={c.id} className="vaga-card">
                <div className="vaga-info">
                    <div className="vaga-titulo">Candidatura: {c.vaga.titulo}</div>
                    <div className="vaga-estado">Estado: {c.estado}</div>
                </div>
                <div className="vaga-botoes">
                    <button
                        className="vaga-detalhes-btn"
                        onClick={() => setCDetalhe(c)}
                    > Detalhes
                    </button>
                    {(c.estado==="Aceite")?
                    <button
                        className="vaga-detalhes-btn"
                        onClick={() => setCReview(c)}
                    > Review
                    </button>:null}
                </div>
            </div>
          ))
        )}
      </div>
        {/* Modal Detalhes */}
        {cDetalhe && (
            <div className="vagas-modal-bg" onClick={() => setCDetalhe(null)}>
              <div className="vagas-modal-form" onClick={e => e.stopPropagation()}>
                <h2>Candidatura: {cDetalhe.vaga.titulo}</h2>
                {console.log(cDetalhe)}
                <div><strong>Estado:</strong> {cDetalhe.estado}</div>
                <div><strong>Data envio:</strong> {cDetalhe.data_envio}</div>
                <div><strong>Empresa:</strong> {cDetalhe.vaga.empresa.nome_empresa}</div>
                <br/>
                <div><strong>CV Enviado: </strong>
                  {((cDetalhe.cv && !cDetalhe.cv.includes('empty.pdf'))
        ? (cDetalhe.cv.startsWith('http')
            ? cDetalhe.cv
            : `http://localhost:8000/${cDetalhe.cv}`)
        : null) ? (
                    <a
                      href={`http://localhost:8000/${cDetalhe.cv}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#a3b6d9",
                        display: "block",
                        marginBottom: 6,
                        fontWeight: "bold"
                      }}
                    >
                      {cDetalhe.cv.split('/').pop()}
                    </a>
                  ) : (
                    <span style={{ color: "#a3b6d9", fontSize: '0.95rem', marginBottom: 6 }}>
                      Nenhum CV enviado
                    </span>
                  )}</div>
                <div className="vaga-descricao-detalhe">
                  <strong>Feedback:</strong>
                  <div className="vaga-descricao-box">
                    {cDetalhe.feedback_empresa? cDetalhe.feedback_empresa: "Feedback não disponivel"}
                  </div>
                </div>
                <button
                    type="button"
                    className="register-button vagas-modal-fechar"
                    onClick={() => setCDetalhe(null)}
                >Fechar
                </button>
              </div>
            </div>
        )}
      {cReview && (
          <div className="vagas-modal-bg" onClick={() => setCReview(null)}>
            <div className="vagas-modal-form" onClick={e => e.stopPropagation()}>

            <div className="register-field">
                        <h2>Review: {cReview.vaga.empresa.nome_empresa}</h2>
                        <label>Comentário:</label>
                        <textarea value={novaReview.comentario} required
                                  onChange={e => setNovaReview(v => ({...v, comentario: e.target.value}))}/>
                    </div>
                    <button
                        type="button"
                        className="register-button vagas-modal-fechar"
                        onClick={handleCriarReview}
                    >Submeter
                    </button>
                    <button
                        type="button"
                        className="register-button vagas-modal-fechar"
                        onClick={() => setCReview(null)}
                    >Fechar
                    </button>
                </div>
            </div>
        )}
    </div>
  );
}


export default CandidaturasCandidato;