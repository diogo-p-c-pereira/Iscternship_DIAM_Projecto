import React from "react";
import VagaDetalhes from "../../Candidato/VagasCandidato/VagaDetalhes";
import { Button } from "reactstrap";

function ModalVagaDetalhes({ vagaDetalhe, onFechar, onRemover }) {
  return (
    <div className="vagas-modal-bg" onClick={onFechar}>
      <div className="vagas-modal-form" onClick={(e) => e.stopPropagation()}>
        <VagaDetalhes vagaDetalhe={vagaDetalhe}>
          <br />
          <Button type="button" color="danger" onClick={() => onRemover(vagaDetalhe.id)}>
            <strong>Remover</strong>
          </Button>
          <button type="button" className="register-button vagas-modal-fechar" onClick={onFechar}>
            Fechar
          </button>
        </VagaDetalhes>
      </div>
    </div>
  );
}

export default ModalVagaDetalhes;
