import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../Assets/Styles/Pages/Vagas.css";
import {useNavigate} from "react-router-dom";
import { Button } from "reactstrap";
import VagaDetalhes from '../../../Components/VagaDetalhes';
import {useUserContext} from "../../../UserProvider";


function CandidaturasCandidato() {
  const {user, setUser} = useUserContext();
  const [candidaturas, setCandidaturas] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [cReview, setCReview] = useState(null);
  const navigate = useNavigate();



  useEffect(() => {
    axios.get("http://localhost:8000/db_iscternship/candidaturasCandidato/" + user.id)
        .then(res => setCandidaturas(res.data || []))
      .catch(() => setCandidaturas([]));
  }, []);

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
                    <div className="vaga-titulo">Titulo da Candidatura: {c.vaga.titulo}</div>
                    <div className="vaga-estado">Estado: {c.estado}</div>
                </div>
                <div className="vaga-botoes">
                    <button
                        className="vaga-detalhes-btn"
                        onClick={() => setCReview(true)}
                    > Detalhes
                    </button>
                    {(c.estado==="Aceite")?
                    <button
                        className="vaga-detalhes-btn"
                        onClick={() => setCReview(true)}
                    > Review
                    </button>:null}
                </div>
            </div>
          ))
        )}
      </div>
        {/* Modal Detalhes */}
        {cReview && (
            <div className="vagas-modal-bg" onClick={() => setCReview(null)}>
              <div className="vagas-modal-form" onClick={e => e.stopPropagation()}>

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