import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../Assets/Styles/Pages/Vagas.css";
import {useNavigate} from "react-router-dom";
import { Button } from "reactstrap";
import VagaDetalhes from '../../../Components/VagaDetalhes';


function AnalisarVagas() {
const [vagas, setVagas] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [vagaDetalhe, setVagaDetalhe] = useState(null);
  const URL_DELETEVAGA = "http://localhost:8000/db_iscternship/removerVaga/"
  const navigate = useNavigate();

  const apagarVaga = (vagaId) => {

  axios.delete(`http://localhost:8000/db_iscternship/removerVaga/${vagaId}/`)
    .then(() => {
      setVagas(vagas.filter(v => v.id !== vagaId));
    }).then(navigate(0))
    .catch(() => {
      alert("Erro ao remover vaga.");
    });
};

  useEffect(() => {
    axios.get("http://localhost:8000/db_iscternship/vagasAdmin/")
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
                    <div className="vaga-estado">Reportada: {vaga.isReportada?"Sim":"Não"}</div>
                </div>
                <div className="vaga-botoes">
                <button
                    className="vaga-detalhes-btn"
                    onClick={() => setVagaDetalhe(vaga)}
                >Detalhes
                </button>
                <button
                    className="vaga-remover-btn"
                    onClick={() => apagarVaga(vaga.id)}
                > Remover
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Modal Detalhes */}
      {vagaDetalhe && (
          <div className="vagas-modal-bg" onClick={() => setVagaDetalhe(null)}>
              <div className="vagas-modal-form" onClick={e => e.stopPropagation()}>
                  <VagaDetalhes vagaDetalhe={vagaDetalhe}>
                  <br/>
                  <Button
                          type="button"
                          color="danger"
                          onClick={() => apagarVaga(vagaDetalhe.id)}
                      ><strong>Remover</strong>
                  </Button>
                  <button
                      type="button"
                      className="register-button vagas-modal-fechar"
                      onClick={() => setVagaDetalhe(null)}
                  >Fechar
                  </button>
                  </VagaDetalhes>
              </div>
          </div>
      )}
    </div>
  );
}


export default AnalisarVagas;