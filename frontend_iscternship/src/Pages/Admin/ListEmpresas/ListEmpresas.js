import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import {useNavigate, Link} from "react-router-dom";
import axios from "axios";
import MapComponent from '../../../Components/MapComponent'

function ListEmpresas() {
const URL_EMPRESAS = "http://localhost:8000/db_iscternship/verEmpresas/"; // (1)
    const URL_DELETEEMRPRESA = "http://localhost:8000/db_iscternship/deleteEmpresa/";
    const [empresasList, setEmpresasList] = useState([]); // (2)
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

  const getEmpresas = () => { // (3)
    axios.get(URL_EMPRESAS)
      .then((request) => {
        setEmpresasList(request.data)
      }).catch(error => (alert(error)));
  };

  const [pesquisa, setPesquisa] = useState("");
const [empresaDetalhe, setEmpresaDetalhe] = useState(null);

  useEffect(() => { // (4)
    getEmpresas();
  }, []);

  const apagarEmpresa = (id) => {
      axios.delete(URL_DELETEEMRPRESA + id).then(navigate(0))
  }


    const empresasFiltradas = empresasList.filter(e =>
        e.nome_empresa.toLowerCase().includes(pesquisa.trim().toLowerCase())
  );

    if (!empresasList) return <p>A carregar dados...</p>;

  return (
      <div className="vagas-empresa-container">
          <div className="vagas-filtros">
              <input
                  type="text"
                  className="vagas-barra-pesquisa"
                  placeholder="Pesquisar empresa por nome..."
                  value={pesquisa}
                  onChange={e => setPesquisa(e.target.value)}
              />
          </div>
          <div className="vagas-lista-box">
              {empresasFiltradas.length === 0 ? (
                  <p style={{color: "#fff", textAlign: "center"}}>Sem empresas para mostrar.</p>
              ) : (
                  empresasFiltradas.map((c) => (
                      <div key={c.id} className="vaga-card">
                          <div className="vaga-info">
                              <div className="vaga-titulo">{c.nome_empresa}</div>
                              <div>Username: {c.user.username}</div>
                              <div>Aprovada: {c.is_approved?"Sim":"Não"}</div>
                          </div>
                          <div className="vaga-botoes">
                              <button
                                  className="vaga-detalhes-btn"
                                  onClick={() => setEmpresaDetalhe(c)}
                              > Detalhes
                              </button>
                              <button
                                  className="vaga-remover-btn"
                                  onClick={() => apagarEmpresa(c.id)}
                              > Remover
                              </button>
                          </div>
                      </div>
                  ))
              )}
          </div>
          {empresaDetalhe && (
              <div className="vagas-modal-bg" onClick={() => setEmpresaDetalhe(null)}>
                  <div className="vagas-modal-form" onClick={e => e.stopPropagation()}>
                      <h2> {empresaDetalhe.nome_empresa}</h2>
                      <div className="vaga-empresa-extra">
                          <img
                              src={
                                  empresaDetalhe.empresa_imagem?.startsWith('http')
                                      ? empresaDetalhe.empresa_imagem
                                      : `http://localhost:8000/${empresaDetalhe.imagem}`
                              }
                              alt="Empresa"
                              className="vaga-empresa-img"
                          />
                          <div className="vaga-empresa-dados">
                              <div><strong>Username:</strong> {empresaDetalhe.user.username}</div>
                              <div><strong>Email:</strong> {empresaDetalhe.user.email}</div>
                              <div><strong>Telefone:</strong> {empresaDetalhe.telefone}</div>
                              <div><strong>Morada:</strong> {empresaDetalhe.morada}</div>
                          </div>
                      </div>
                      <strong>Aprovada:</strong>
                      <div>
                          {empresaDetalhe.is_approved?"Sim": "Não"}
                      </div>
                      <br/>
                      <strong>Data de Registo:</strong>
                      <div>
                          {formatDate(empresaDetalhe.user.date_joined)}
                      </div>
                      <br/>
                      <strong>Último login:</strong>
                      <div>
                          {formatDate(empresaDetalhe.user.last_login)}
                      </div>
                      <br/>
                      <MapComponent address={empresaDetalhe.morada} />
                      <br/>
                      <Button
                          type="button"
                          color="danger"
                          onClick={() => apagarEmpresa(empresaDetalhe.id)}
                      ><strong>Apagar</strong>
                      </Button>
                      <button
                          type="button"
                          className="register-button vagas-modal-fechar"
                          onClick={() => setEmpresaDetalhe(null)}
                      >Fechar
                      </button>
                  </div>
              </div>
          )}
      </div>
  );

}


export default ListEmpresas;