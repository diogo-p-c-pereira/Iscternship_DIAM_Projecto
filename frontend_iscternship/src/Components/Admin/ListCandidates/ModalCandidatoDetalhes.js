// src/Components/ModalCandidatoDetalhes.js
import React from "react";
import { Button } from "reactstrap";

function ModalCandidatoDetalhes({ candidato, onClose, onDelete, formatDate }) {
  const imgSrc = candidato.candidato_imagem?.startsWith("http")
    ? candidato.candidato_imagem
    : `http://localhost:8000/${candidato.imagem}`;

  const cvLink = candidato.cv && !candidato.cv.includes("empty.pdf")
    ? (candidato.cv.startsWith("http")
        ? candidato.cv
        : `http://localhost:8000/${candidato.cv}`)
    : null;

  return (
    <div className="vagas-modal-bg" onClick={onClose}>
      <div className="vagas-modal-form" onClick={(e) => e.stopPropagation()}>
        <h2>{candidato.user.first_name} {candidato.user.last_name}</h2>

        <div className="vaga-empresa-extra">
          <img src={imgSrc} alt="Candidato" className="vaga-empresa-img" />
          <div className="vaga-empresa-dados">
            <div><strong>Username:</strong> {candidato.user.username}</div>
            <div><strong>Email:</strong> {candidato.user.email}</div>
            <div><strong>Telefone:</strong> {candidato.telefone}</div>
          </div>
        </div>

        <strong>Descrição:</strong>
        <div>{candidato.descricao}</div>
        <br />

        <strong>Curriculum vitae:</strong>
        <div>
          {cvLink ? (
            <a href={cvLink} target="_blank" rel="noopener noreferrer"
              style={{ color: "#a3b6d9", display: "block", marginBottom: 6, fontWeight: "bold" }}>
              {candidato.cv.split("/").pop()}
            </a>
          ) : (
            <span style={{ color: "#a3b6d9", fontSize: "0.95rem", marginBottom: 6 }}>
              Nenhum CV enviado
            </span>
          )}
        </div>

        <br />
        <strong>Data de Registo:</strong>
        <div>{formatDate(candidato.user.date_joined)}</div>
        <br />
        <strong>Último login:</strong>
        <div>{formatDate(candidato.user.last_login)}</div>
        <br />

        <Button color="danger" onClick={() => onDelete(candidato.id)}>
          <strong>Apagar</strong>
        </Button>
        <button className="register-button vagas-modal-fechar" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}

export default ModalCandidatoDetalhes;
