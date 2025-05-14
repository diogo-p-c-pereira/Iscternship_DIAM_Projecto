import {useParams, useNavigate, Link} from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Gpt from './Gpt'
import { Button } from "reactstrap";

function Candidatar() {

  const URL_VAGA = "http://localhost:8000/db_iscternship/api/verVaga/"; // (1)
    const URL_CANDIDATURA = "http://localhost:8000/db_iscternship/api/candidatura/";

    const { vagaId } = useParams();
  const [vaga, setVaga] = useState([]); // (2)
  const navigate = useNavigate();


  const getVaga = () => { // (3)
    axios.get(URL_VAGA + vagaId)
      .then((request) => {
        setVaga(request.data)
      }).catch(error => (alert(error)))};

  useEffect(() => { // (4)
    getVaga();
  }, []);


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


  if (!vaga || !vaga.empresa) return <p>A carregar dados...</p>;

  return (
      <div className="container mt-4" style={{paddingTop: "2%"}}>
          <h3>Detalhes da Vaga</h3>
          <h5> {vaga.empresa.nome_empresa}
          </h5>
          <Gpt/>

          <br/>
          <Button color="secondary" onClick={() => navigate(-1)}>
              Voltar
          </Button>
      </div>
  );
}

export default Candidatar;