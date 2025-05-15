import React, { useEffect, useState } from "react";
import { Table , Button } from "reactstrap";
import {useNavigate, Link} from "react-router-dom";
import axios from "axios";


function ListCandidates() {
  const URL_CANDIDATOS = "http://localhost:8000/db_iscternship/verCandidatos/"; // (1)
    const URL_DELETECANDIDATO = "http://localhost:8000/db_iscternship/deleteCandidato/";
    const [candidatosList, setCandidatosList] = useState([]); // (2)
      const navigate = useNavigate();

  const getCandidatos = () => { // (3)
    axios.get(URL_CANDIDATOS)
      .then((request) => {
        setCandidatosList(request.data)
      }).catch(error => (alert(error)));
  };

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
                      <Link to={`/detailCandidates/${c.id}`}>
                        <Button color="secondary">Detalhes</Button>
                      </Link>
                    <Button color="danger" onClick={() => apagarCandidato(c.id)}>
                        Apagar
                    </Button>
                  </td>
              </tr>
          ))}
          </tbody>
      </Table>
  );
}


export default ListCandidates;