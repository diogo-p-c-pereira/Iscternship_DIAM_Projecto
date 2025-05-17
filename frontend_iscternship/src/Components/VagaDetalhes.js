
import React, {useEffect, useState} from 'react';
import MapComponent from './MapComponent'
import {useUserContext} from "../UserProvider";
import axios from "axios";

const VagaDetalhes = ({ vagaDetalhe }) => {
      const {user, setUser} = useUserContext();
      const [reviews, setReviews] = useState([]);

       useEffect(() => {
    axios.get("http://localhost:8000/db_iscternship/reviews/" + vagaDetalhe.empresa_id)
        .then(res => setReviews(res.data || []))
      .catch(() => setReviews([]));
  }, []);

    return (
        <>
            <h2>{vagaDetalhe.titulo}</h2>
            <div>
                <strong>Estado:</strong> {vagaDetalhe.estado}
            </div>

            <div>
                <strong>Nº de candidatos:</strong> {vagaDetalhe.n_candidatos ?? 0}
            </div>
            {user.is_superuser ?
                <div><strong>Reportada:</strong> {vagaDetalhe.isReportada ? "Sim" : "Não"}</div> : null}
            <div className="vaga-empresa-extra">
                <img
                    src={
                        vagaDetalhe.empresa_imagem?.startsWith('http')
                            ? vagaDetalhe.empresa_imagem
                            : `http://localhost:8000/${vagaDetalhe.empresa_imagem}`
                    }
                    alt="Empresa"
                    className="vaga-empresa-img"
                />
                <div className="vaga-empresa-dados">
                    <div><strong>Empresa:</strong> {vagaDetalhe.empresa_nome}</div>
                    <div><strong>Morada:</strong> {vagaDetalhe.empresa_morada}</div>
                    <div><strong>Telefone:</strong> {vagaDetalhe.empresa_telefone}</div>
                </div>
            </div>
            <div className="vaga-descricao-detalhe">
                <strong>Descrição:</strong>
                <div className="vaga-descricao-box">
                    {vagaDetalhe.descricao}
                </div>
            </div>
            <MapComponent address={vagaDetalhe.empresa_morada}/>
            <br/>
            <br/>
            <div><strong>Reviews:</strong>
                {reviews.length === 0 ? (
          <p style={{ color: "#fff", textAlign: "center" }}>Sem Reviews para mostrar.</p>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="vaga-card">
              <div className="vaga-info">
                <div className="vaga-titulo">Nome: {r.candidato.user.first_name} {r.candidato.user.last_name}</div>
                <div>{r.comentario}</div>
              </div>
            </div>
          ))
        )}
            </div>
        </>
    );
};

export default VagaDetalhes;