import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "../../../Assets/Styles/Pages/Vagas.css";

import axios from "axios";
import FiltroPesquisa from "../../../Components/Mutual/FiltroPesquisa";
import EmpresaCard from "../../../Components/Admin/ListEmpresas/EmpresaCard";
import ModalEmpresaDetalhes from "../../../Components/Admin/ListEmpresas/ModalEmpresaDetalhes";

function ListEmpresas() {
  const URL_EMPRESAS = "http://localhost:8000/db_iscternship/verEmpresas/";
  const URL_DELETEEMPRESA = "http://localhost:8000/db_iscternship/deleteEmpresa/";
  const [empresasList, setEmpresasList] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [empresaDetalhe, setEmpresaDetalhe] = useState(null);
  const navigate = useNavigate();

  const getEmpresas = () => {
    axios.get(URL_EMPRESAS)
      .then(res => setEmpresasList(res.data || []))
      .catch(err => alert(err));
  };

  useEffect(() => {
    getEmpresas();
  }, []);

  const apagarEmpresa = (id) => {
    axios.delete(URL_DELETEEMPRESA + id).then(() => navigate(0));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Nunca";
    return new Date(dateString).toLocaleDateString("pt-PT", {
      year: "numeric", month: "long", day: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit"
    });
  };

  const empresasFiltradas = empresasList.filter(e =>
    e.nome_empresa.toLowerCase().includes(pesquisa.trim().toLowerCase())
  );

  return (
    <div className="vagas-empresa-container">
      <FiltroPesquisa pesquisa={pesquisa} setPesquisa={setPesquisa} />

      <div className="vagas-lista-box">
        {empresasFiltradas.length === 0 ? (
          <p style={{ color: "#fff", textAlign: "center" }}>Sem empresas para mostrar.</p>
        ) : (
          empresasFiltradas.map(empresa => (
            <EmpresaCard
              key={empresa.id}
              empresa={empresa}
              onDetalhesClick={setEmpresaDetalhe}
              onRemoverClick={apagarEmpresa}
            />
          ))
        )}
      </div>

      {empresaDetalhe && (
        <ModalEmpresaDetalhes
          empresa={empresaDetalhe}
          onClose={() => setEmpresaDetalhe(null)}
          onDelete={apagarEmpresa}
          formatDate={formatDate}
        />
      )}
    </div>
  );
}

export default ListEmpresas;
