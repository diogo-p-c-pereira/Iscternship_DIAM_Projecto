import {useParams, useNavigate, Link} from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "reactstrap";

function DetailCandidates() {

  const URL_CANDIDATOS = "http://localhost:8000/db_iscternship/candidatoAdmin/"; // (1)
    const URL_DELETECANDIDATO = "http://localhost:8000/db_iscternship/deleteCandidato/";

    const { candidatoId } = useParams();
  const [candidato, setCandidato] = useState([]); // (2)
  const navigate = useNavigate();


  const getCandidato = () => { // (3)
    axios.get(URL_CANDIDATOS + candidatoId)
      .then((request) => {
        setCandidato(request.data)
      }).catch(error => (alert(error)))};

  useEffect(() => { // (4)
    getCandidato();
  }, []);
  const apagarCandidato = (id) => {
      axios.delete(URL_DELETECANDIDATO + id).then(navigate('/listCandidates'))
  }


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


  if (!candidato || !candidato.user) return <p>A carregar dados...</p>;
    
  return (
      <div className="container mt-4" style={{paddingTop: "2%"}}>
          <h3>Detalhe do Candidato</h3>
          <img src={"http://127.0.0.1:8000" + candidato.imagem} alt="imagem" height="150px"/><br/>
          <h5> Username: {candidato.user.username} <br/>
              Primeiro Nome: {candidato.user.first_name} <br/>
              Último Nome: {candidato.user.last_name} <br/>
              Email: {candidato.user.email} <br/>
              Telefone : {candidato.telefone} <br/>
              Descrição: {candidato.descricao} <br/>
              Data de Registo: {formatDate(candidato.user.date_joined)} <br/>
              Último Login: {formatDate(candidato.user.last_login)}
          </h5>

          <br/>
          <Button color="secondary" onClick={() => navigate("/listCandidates")}>
              Voltar
          </Button>
          <Button color="danger" onClick={() => apagarCandidato(candidato.id)}>
              Apagar
          </Button>
      </div>
  );
}

export default DetailCandidates;
