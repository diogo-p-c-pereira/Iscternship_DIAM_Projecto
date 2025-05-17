// src/Components/ModalEmpresaDetalhes.js
import React from "react";
import { Button } from "reactstrap";
import MapComponent from '../../Mutual/MapComponent';

function ModalEmpresaDetalhes({ empresa, onClose, onDelete, formatDate }) {
  const imgSrc = empresa.empresa_imagem?.startsWith("http")
    ? empresa.empresa_imagem
    : `http://localhost:8000/${empresa.imagem}`;

  return (
    <div className="vagas-modal-bg" onClick={onClose}>
      <div className="vagas-modal-form" onClick={(e) => e.stopPropagation()}>
        <h2>{empresa.nome_empresa}</h2>

        <div className="vaga-empresa-extra">
          <img src={imgSrc} alt="Empresa" className="vaga-empresa-img" />
          <div className="vaga-empresa-dados">
            <div><strong>Username:</strong> {empresa.user.username}</div>
            <div><strong>Email:</strong> {empresa.user.email}</div>
            <div><strong>Telefone:</strong> {empresa.telefone}</div>
            <div><strong>Morada:</strong> {empresa.morada}</div>
          </div>
        </div>

        <strong>Aprovada:</strong>
        <div>{empresa.is_approved ? "Sim" : "Não"}</div>
        <br />
        <strong>Data de Registo:</strong>
        <div>{formatDate(empresa.user.date_joined)}</div>
        <br />
        <strong>Último login:</strong>
        <div>{formatDate(empresa.user.last_login)}</div>
        <br />
        <MapComponent address={empresa.morada} />
        <br />
        <Button color="danger" onClick={() => onDelete(empresa.id)}>
          <strong>Apagar</strong>
        </Button>
        <button className="register-button vagas-modal-fechar" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}

export default ModalEmpresaDetalhes;
