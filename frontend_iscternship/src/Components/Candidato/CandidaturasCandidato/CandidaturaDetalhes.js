import React from 'react';
import { useUserContext } from '../../../UserProvider';

const CandidaturaDetalhes = ({ cDetalhe, children }) => {
  const { user } = useUserContext();

  const cvLink =
    cDetalhe.cv && !cDetalhe.cv.includes('empty.pdf')
      ? (cDetalhe.cv.startsWith('http')
          ? cDetalhe.cv
          : `http://localhost:8000/${cDetalhe.cv}`)
      : null;

  const formatDate = (dateString) => {
    if (!dateString) return "Nunca";
    return new Date(dateString).toLocaleDateString("pt-PT", {
      year: "numeric", month: "long", day: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit"
    });
  };

  return (
    <div>
      <h2>Candidatura: {cDetalhe.vaga.titulo}</h2>

      <div><strong>Estado:</strong> {cDetalhe.estado}</div>
      <div><strong>Data envio:</strong> {formatDate(cDetalhe.data_envio)}</div>
      <div><strong>Empresa:</strong> {cDetalhe.vaga.empresa.nome_empresa}</div>
      <br />

      <div>
        <strong>CV Enviado:</strong>
        {cvLink ? (
          <a
            href={cvLink}
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
          <span style={{ color: "#a3b6d9", fontSize: '0.95rem', marginBottom: 6 }}>
            Nenhum CV enviado
          </span>
        )}
      </div>

      {children && <div style={{ marginTop: 20 }}>{children}</div>}
    </div>
  );
};

export default CandidaturaDetalhes;
