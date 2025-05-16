import React, { useEffect, useState } from "react";
import { Table , Button } from "reactstrap";
import {useNavigate, Link} from "react-router-dom";
import axios from "axios";


function ListCandidates() {
  const URL_CANDIDATOS = "http://localhost:8000/db_iscternship/verCandidatos/"; // (1)
    const URL_DELETECANDIDATO = "http://localhost:8000/db_iscternship/deleteCandidato/";
    const [candidatosList, setCandidatosList] = useState([]); // (2)
      const navigate = useNavigate();

      const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-PT", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
 });
};

  const getCandidatos = () => { // (3)
    axios.get(URL_CANDIDATOS)
      .then((request) => {
        setCandidatosList(request.data)
      }).catch(error => (alert(error)));
  };

const [candidatoDetalhe, setCandidatoDetalhe] = useState(null);

  useEffect(() => { // (4)
    getCandidatos();
  }, []);

  const apagarCandidato = (id) => {
      axios.delete(URL_DELETECANDIDATO + id).then(navigate(0))
  }

  const centered = { textAlign: "center" };
//TODO Ver permissões só Admin

    if (!candidatosList) return <p>A carregar dados...</p>;
    
  return (
      <>
      <Table light="true"> {/* (5) */}
          <thead>
          <tr><th> Candidatos</th></tr>
          <tr>
              <th>Username</th>
              <th>Nome</th>
              <th>Email</th>
              <th style={centered}></th>
          </tr>
          </thead>
          <tbody>
          {candidatosList.map((c) => (
              <tr key={c.id}>
                  <td> {c.user.username}</td>
                  <td>{c.user.first_name} {c.user.last_name}</td>
                  <td>{c.user.email}</td>
                  <td style={{textAlign: "center"}}>
                        <Button color="secondary" onClick={() => setCandidatoDetalhe(c)}>Detalhes</Button>
                    <Button color="danger" onClick={() => apagarCandidato(c.id)}>
                        Apagar
                    </Button>
                  </td>
              </tr>
          ))}
          </tbody>
      </Table>
      {candidatoDetalhe && (
        <div className="vagas-modal-bg" onClick={() => setCandidatoDetalhe(null)}>
            <div className="vagas-modal-form" onClick={e => e.stopPropagation()}>
                <h2> {candidatoDetalhe.user.first_name} {candidatoDetalhe.user.last_name}</h2>
                <div className="vaga-empresa-extra">
                    <img
                        src={
                            candidatoDetalhe.candidato_imagem?.startsWith('http')
                                ? candidatoDetalhe.candidato_imagem
                                : `http://localhost:8000/${candidatoDetalhe.imagem}`
                        }
                        alt="Candidato"
                        className="vaga-empresa-img"
                    />
                    <div className="vaga-empresa-dados">
                        <div><strong>Username:</strong> {candidatoDetalhe.user.username}</div>
                        <div><strong>Email:</strong> {candidatoDetalhe.user.email}</div>
                        <div><strong>Telefone:</strong> {candidatoDetalhe.telefone}</div>
                    </div>
                </div>
                    <strong>Descrição:</strong>
                    <div>
                        {candidatoDetalhe.descricao}
                    </div>
                <br/>
                <strong>Data de Registo:</strong>
                <div>
                    {formatDate(candidatoDetalhe.user.date_joined)}
                </div>
                <br/>
                <strong>Último login:</strong>
                <div>
                    {formatDate(candidatoDetalhe.user.last_login)}
                </div>
                <br/>
                <Button
                    type="button"
                    color="danger"
                    onClick={() => apagarCandidato(candidatoDetalhe.id)}
                ><strong>Apagar</strong>
                </Button>
                <button
                    type="button"
                    className="register-button vagas-modal-fechar"
                    onClick={() => setCandidatoDetalhe(null)}
                >Fechar
                </button>
            </div>
        </div>
      )}
      </>
  );
}


export default ListCandidates;