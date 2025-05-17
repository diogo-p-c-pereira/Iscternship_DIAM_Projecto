import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../Assets/Styles/Pages/Vagas.css";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../UserProvider";
import CandidaturaDetalhes from "../../../Components/Candidato/CandidaturasCandidato/CandidaturaDetalhes";
import FiltroPesquisa from "../../../Components/Mutual/FiltroPesquisa";
import CandidaturaCard from "../../../Components/Candidato/CandidaturasCandidato/CandidaturaCard";
import ModalReview from "../../../Components/Candidato/CandidaturasCandidato/ModalReview";

function CandidaturasCandidato() {
  const { user } = useUserContext();
  const userId = user.id;
  const navigate = useNavigate();

  const [candidaturas, setCandidaturas] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [cReview, setCReview] = useState();
  const [cDetalhe, setCDetalhe] = useState();
  const [novaReview, setNovaReview] = useState({ comentario: "" });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/db_iscternship/candidaturasCandidato/${user.id}`)
      .then((res) => setCandidaturas(res.data || []))
      .catch(() => setCandidaturas([]));
  }, []);

  const handleCriarReview = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:8000/db_iscternship/criarReview/${userId}/${cReview.vaga.empresa.id}`,
        novaReview
      )
      .then(() => {
        setCReview(null);
        setNovaReview({ comentario: "" });
      })
      .catch(() => {
        alert("Erro ao criar review!");
      });
  };

  const candidaturasFiltradas = candidaturas.filter((c) =>
    c.vaga.titulo.toLowerCase().includes(pesquisa.trim().toLowerCase())
  );

  return (
    <div className="vagas-empresa-container">
      <FiltroPesquisa pesquisa={pesquisa} setPesquisa={setPesquisa} />

      <div className="vagas-lista-box">
        {candidaturasFiltradas.length === 0 ? (
          <p className="vagas-sem-resultados">Sem candidaturas para mostrar.</p>
        ) : (
          candidaturasFiltradas.map((c) => (
            <CandidaturaCard
              key={c.id}
              candidatura={c}
              onDetalhesClick={setCDetalhe}
              onReviewClick={setCReview}
            />
          ))
        )}
      </div>

      {cDetalhe && (
        <div className="vagas-modal-bg" onClick={() => setCDetalhe(null)}>
          <div className="vagas-modal-form" onClick={(e) => e.stopPropagation()}>
            <CandidaturaDetalhes cDetalhe={cDetalhe} />
            <button
              type="button"
              className="register-button vagas-modal-fechar"
              onClick={() => setCDetalhe(null)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {cReview && (
        <ModalReview
          cReview={cReview}
          novaReview={novaReview}
          onChangeComentario={(comentario) => setNovaReview({ comentario })}
          onSubmit={handleCriarReview}
          onClose={() => setCReview(null)}
        />
      )}
    </div>
  );
}

export default CandidaturasCandidato;
