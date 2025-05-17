
import React, {useEffect, useState} from 'react';
import MapComponent from './MapComponent'
import {useUserContext} from "../UserProvider";
import axios from "axios";

const CandidaturaDetalhes = ({ cDetalhe, children }) => {
    return (
        <div>
            <h2>Candidatura: {cDetalhe.vaga.titulo}</h2>
            {console.log(cDetalhe)}
            <div><strong>Estado:</strong> {cDetalhe.estado}</div>
            <div><strong>Data envio:</strong> {cDetalhe.data_envio}</div>
            <div><strong>Empresa:</strong> {cDetalhe.vaga.empresa.nome_empresa}</div>
            <br/>
            <div><strong>CV Enviado: </strong>
                {((cDetalhe.cv && !cDetalhe.cv.includes('empty.pdf'))
                    ? (cDetalhe.cv.startsWith('http')
                        ? cDetalhe.cv
                        : `http://localhost:8000/${cDetalhe.cv}`)
                    : null) ? (
                    <a
                        href={`http://localhost:8000/${cDetalhe.cv}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: "#a3b6d9",
                            display: "block",
                            marginBottom: 6,
                            fontWeight: "bold"
                        }}
                    >
                        {cDetalhe.cv.split('/').pop()}
                    </a>
                ) : (
                    <span style={{color: "#a3b6d9", fontSize: '0.95rem', marginBottom: 6}}>
                      Nenhum CV enviado
                    </span>
                )}</div>
            <div className="vaga-descricao-detalhe">
                <strong>Feedback:</strong>
                <div className="vaga-descricao-box">
                    {cDetalhe.feedback_empresa ? cDetalhe.feedback_empresa : "Feedback não disponivel"}
                </div>
            </div>
        </div>
    );
};

export default CandidaturaDetalhes;