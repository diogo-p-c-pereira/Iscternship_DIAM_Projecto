import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../Assets/Styles/Pages/Vagas.css";
import { useNavigate } from "react-router-dom";

import FiltroPesquisa from "../../../Components/Mutual/FiltroPesquisa";
import VagaCardAdmin from "../../../Components/Admin/AnalisarVagas/VagaCardAdmin";
import ModalVagaDetalhes from "../../../Components/Admin/AnalisarVagas/ModalVagaDetalhes";

function AnalisarVagas() {
  const [vagas, setVagas] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [vagaDetalhe, setVagaDetalhe] = useState(null);
  const navigate = useNavigate();

  const apagarVaga = (vagaId) => {
    axios
      .delete(`http://localhost:8000/db_iscternship/removerVaga/${vagaId}/`)
      .then(() => {
        setVagas(vagas.filter((v) => v.id !== vagaId));
        navigate(0);
      })
      .catch(() => {
        alert("Erro ao remover vaga.");
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/db_iscternship/vagas/")
      .then((res) => setVagas(res.data || []))
      .catch(() => setVagas([]));
  }, []);

  const vagasFiltradas = vagas.filter((vaga) =>
    vaga.titulo.toLowerCase().includes(pesquisa.trim().toLowerCase())
  );

  return (
    <div className="vagas-empresa-container">
      <FiltroPesquisa pesquisa={pesquisa} setPesquisa={setPesquisa} />

      <div className="vagas-lista-box">
        {vagasFiltradas.length === 0 ? (
          <p className="vagas-sem-resultados">Sem vagas para mostrar.</p>
        ) : (
          vagasFiltradas.map((vaga) => (
            <VagaCardAdmin
              key={vaga.id}
              vaga={vaga}
              onDetalhesClick={setVagaDetalhe}
              onRemoverClick={apagarVaga}
            />
          ))
        )}
      </div>

      {vagaDetalhe && (
        <ModalVagaDetalhes
          vagaDetalhe={vagaDetalhe}
          onFechar={() => setVagaDetalhe(null)}
          onRemover={apagarVaga}
        />
      )}
    </div>
  );
}

export default AnalisarVagas;
