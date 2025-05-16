import {useParams, useNavigate, Link} from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import LLM_Component from "../LLM_Component"
import { Button } from "reactstrap";

function Candidatar() {

  const URL_VAGA = "http://localhost:8000/db_iscternship/verVaga/"; // (1)
    const URL_CANDIDATURA = "http://localhost:8000/db_iscternship/candidatura/";

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
          <h4>Titulo: {vaga.titulo}</h4>
          <h5>
              {vaga.descricao} <br/>
              {vaga.empresa.nome_empresa}
          </h5>
          <LLM_Component vaga_info={JSON.stringify(vaga, null, 2)} cv_path={"cv_files/CV_DiogoPereira.pdf"}/>

          <br/>
          <Button color="secondary" onClick={() => navigate(-1)}>
              Voltar
          </Button>
      </div>
  );
}

export default Candidatar;