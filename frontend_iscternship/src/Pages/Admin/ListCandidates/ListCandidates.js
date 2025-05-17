import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../Assets/Styles/Pages/Vagas.css";
import FiltroPesquisa from "../../../Components/Mutual/FiltroPesquisa";
import CandidatoCard from "../../../Components/Admin/ListCandidates/CandidatoCard";
import ModalCandidatoDetalhes from "../../../Components/Admin/ListCandidates/ModalCandidatoDetalhes";
import axios from "axios";

function ListCandidates() {
  const URL_CANDIDATOS = "http://localhost:8000/db_iscternship/verCandidatos/";
  const URL_DELETECANDIDATO = "http://localhost:8000/db_iscternship/deleteCandidato/";
  const [candidatosList, setCandidatosList] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [candidatoDetalhe, setCandidatoDetalhe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(URL_CANDIDATOS)
      .then(res => setCandidatosList(res.data || []))
      .catch(err => alert(err));
  }, []);

  const apagarCandidato = (id) => {
    axios.delete(URL_DELETECANDIDATO + id).then(() => navigate(0));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Nunca";
    return new Date(dateString).toLocaleDateString("pt-PT", {
      year: "numeric", month: "long", day: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit"
    });
  };

  const candidatosFiltrados = candidatosList.filter(c =>
    c.user.username.toLowerCase().includes(pesquisa.trim().toLowerCase())
  );

  return (
    <div className="vagas-empresa-container">
      <FiltroPesquisa pesquisa={pesquisa} setPesquisa={setPesquisa} />

      <div className="vagas-lista-box">
        {candidatosFiltrados.length === 0 ? (
          <p style={{ color: "#fff", textAlign: "center" }}>Sem candidatos para mostrar.</p>
        ) : (
          candidatosFiltrados.map(candidato => (
            <CandidatoCard
              key={candidato.id}
              candidato={candidato}
              onDetalhesClick={setCandidatoDetalhe}
              onRemoverClick={apagarCandidato}
            />
          ))
        )}
      </div>

      {candidatoDetalhe && (
        <ModalCandidatoDetalhes
          candidato={candidatoDetalhe}
          onClose={() => setCandidatoDetalhe(null)}
          onDelete={apagarCandidato}
          formatDate={formatDate}
        />
      )}
    </div>
  );
}

export default ListCandidates;
