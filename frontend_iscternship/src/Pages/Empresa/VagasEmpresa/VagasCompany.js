import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../Assets/Styles/Pages/Vagas.css";
import FiltroEstado from "../../../Components/Empresa/VagasCompany/FiltroEstado";
import VagaCardEmpresa from "../../../Components/Empresa/VagasCompany/VagaCardEmpresa";
import ModalCriarVaga from "../../../Components/Empresa/VagasCompany/ModalCriarVaga";
import ModalEditarVaga from "../../../Components/Empresa/VagasCompany/ModalEditarVaga";

const VagasEmpresa = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  const [editVaga, setEditVaga] = useState(null);
  const [vagas, setVagas] = useState([]);
  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [showCriar, setShowCriar] = useState(false);

  const [novaVaga, setNovaVaga] = useState({
    titulo: "",
    descricao: "",
    estado: "Aberta",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/db_iscternship/vagasEmpresa/${userId}/`)
      .then((res) => setVagas(res.data || []))
      .catch(() => setVagas([]));
  }, [userId]);

  const vagasFiltradas = vagas.filter(
    (vaga) => !estadoFiltro || vaga.estado === estadoFiltro
  );

  const handleCriarVaga = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8000/db_iscternship/criarVagaEmpresa/${userId}/`, novaVaga)
      .then((res) => {
        setVagas([...vagas, res.data]);
        setShowCriar(false);
        setNovaVaga({ titulo: "", descricao: "", estado: "Aberta" });
      })
      .catch(() => alert("Erro ao criar vaga!"));
  };

  const handleRemoverVaga = (vagaId) => {
    axios
      .delete(`http://localhost:8000/db_iscternship/removerVaga/${vagaId}/`)
      .then(() => setVagas(vagas.filter((v) => v.id !== vagaId)))
      .catch(() => alert("Erro ao remover vaga."));
  };

  const handleEditarVaga = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:8000/db_iscternship/editarVaga/${editVaga.id}/`,
        editVaga
      );
      setVagas(vagas.map((v) => (v.id === editVaga.id ? editVaga : v)));
      setEditVaga(null);
    } catch {
      alert("Erro ao editar vaga!");
    }
  };

  return (
    <div className="vagas-empresa-container">
      <FiltroEstado
        estadoFiltro={estadoFiltro}
        setEstadoFiltro={setEstadoFiltro}
        onCriarClick={() => setShowCriar(true)}
      />

      <div className="vagas-lista-box">
        {vagasFiltradas.length === 0 ? (
          <p style={{ color: "#fff", textAlign: "center" }}>
            Sem vagas para mostrar.
          </p>
        ) : (
          vagasFiltradas.map((vaga) => (
            <VagaCardEmpresa
              key={vaga.id}
              vaga={vaga}
              onDetalhesClick={setEditVaga}
              onRemoverClick={handleRemoverVaga}
            />
          ))
        )}
      </div>

      {showCriar && (
        <ModalCriarVaga
          novaVaga={novaVaga}
          setNovaVaga={setNovaVaga}
          onClose={() => setShowCriar(false)}
          onSubmit={handleCriarVaga}
        />
      )}

      {editVaga && (
        <ModalEditarVaga
          editVaga={editVaga}
          setEditVaga={setEditVaga}
          onClose={() => setEditVaga(null)}
          onSubmit={handleEditarVaga}
        />
      )}
    </div>
  );
};

export default VagasEmpresa;
