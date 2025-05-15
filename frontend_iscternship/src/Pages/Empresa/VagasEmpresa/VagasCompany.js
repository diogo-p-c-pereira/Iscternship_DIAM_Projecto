import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../Assets/Styles/Pages/VagasEmpresa.css";

const VagasEmpresa = () => {
  // Busca o user do localStorage dentro do componente:
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user.id;

  const [vagas, setVagas] = useState([]);
  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [showCriar, setShowCriar] = useState(false);
  const [novaVaga, setNovaVaga] = useState({
    titulo: "",
    descricao: "",
    estado: "Aberta",
  });

  useEffect(() => {
    axios.get(`http://localhost:8000/db_iscternship/vagasEmpresa/${userId}/`)
      .then(res => setVagas(res.data || []))
      .catch(() => setVagas([]));
  }, [userId]);


  const vagasFiltradas = vagas.filter(vaga =>
    !estadoFiltro || vaga.estado === estadoFiltro
  );

  const handleCriarVaga = (e) => {
    e.preventDefault();  
    axios.post(`http://localhost:8000/db_iscternship/criarVagaEmpresa/${userId}/`, novaVaga)
      .then(res => {
        setVagas([...vagas, { ...res.data }]);
        setShowCriar(false);
        setNovaVaga({ titulo: "", descricao: "", estado: "Aberta" });
      })
      .catch(() => {
        alert("Erro ao criar vaga!");
      });
  };

  const handleRemoverVaga = (vagaId) => {

  axios.delete(`http://localhost:8000/db_iscternship/removerVaga/${vagaId}/`)
    .then(() => {
      setVagas(vagas.filter(v => v.id !== vagaId));
    })
    .catch(() => {
      alert("Erro ao remover vaga.");
    });
};


  return (
    <div className="vagas-empresa-container">
      <div className="vagas-filtros">
        <select
          value={estadoFiltro}
          onChange={e => setEstadoFiltro(e.target.value)}
          className="vagas-estado-dropdown"
        >
          <option value="">Todos os estados</option>
          <option value="Aberta">Aberta</option>
          <option value="Fechada">Fechada</option>
        </select>
        <button
          className="vagas-criar-btn"
          onClick={() => setShowCriar(true)}
        >
          Criar Vaga
        </button>
      </div>
      <div className="vagas-lista-box">
        {vagasFiltradas.length === 0 ? (
          <p style={{ color: "#fff", textAlign: "center" }}>Sem vagas para mostrar.</p>
        ) : (
          vagasFiltradas.map((vaga) => (
            <div key={vaga.id} className="vaga-card">
              <div className="vaga-info">
                <div className="vaga-titulo">Nome da vaga: {vaga.titulo}</div>
                <div>Estado: {vaga.estado}</div>
                <div>Nº de candidatos: {vaga.n_candidatos ?? 0}</div>
              </div>
                <div className="vaga-botoes">
                  <button
                    className="vaga-detalhes-btn"
                    onClick={() => alert("Implementar navegação para detalhes depois!")}
                  > Detalhes </button>
                  <button
                    className="vaga-remover-btn"
                    onClick={() => handleRemoverVaga(vaga.id)}
                  > Remover </button>
                </div>
            </div>
          ))
        )}
      </div>
      {showCriar && (
        <div className="vagas-modal-bg">
          <form className="vagas-modal-form" onSubmit={handleCriarVaga}>
            <h2>Criar nova vaga</h2>
            <div className="register-field">
              <label>Título</label>
              <input type="text" value={novaVaga.titulo} required onChange={e => setNovaVaga(v => ({ ...v, titulo: e.target.value }))} />
            </div>
            <div className="register-field">
              <label>Descrição</label>
              <textarea value={novaVaga.descricao} required onChange={e => setNovaVaga(v => ({ ...v, descricao: e.target.value }))} />
            </div>
            <div className="register-field">
              <label>Estado</label>
                <select
                  className="vagas-estado-dropdown"
                  value={novaVaga.estado}
                  onChange={e => setNovaVaga(v => ({ ...v, estado: e.target.value }))}
                >
                  <option value="Aberta">Aberta</option>
                  <option value="Fechada">Fechada</option>
                </select>
            </div>
            <div className="register-button-container">
              <button type="button" className="register-button" style={{ background: "#8999c5" }} onClick={() => setShowCriar(false)}>Cancelar</button>
              <button type="submit" className="register-button">Criar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default VagasEmpresa;
