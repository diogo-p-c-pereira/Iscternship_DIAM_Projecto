
import React from 'react';
import MapComponent from './MapComponent'
import {useUserContext} from "../UserProvider";

const VagaDetalhes = ({ vagaDetalhe }) => {
      const {user, setUser} = useUserContext();

    return (
        <>
            <h2>{vagaDetalhe.titulo}</h2>
            <div>
                <strong>Estado:</strong> {vagaDetalhe.estado}
            </div>

            <div>
                <strong>Nº de candidatos:</strong> {vagaDetalhe.n_candidatos ?? 0}
            </div>
            {user.is_superuser?<div><strong>Reportada:</strong> {vagaDetalhe.isReportada ? "Sim" : "Não"}</div>:null}
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
        </>
    );
};

export default VagaDetalhes;