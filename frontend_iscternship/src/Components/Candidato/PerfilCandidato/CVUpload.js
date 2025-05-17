// src/Components/CVUpload.js
import React from "react";

function CVUpload({ cvLink, selectedCV, onChange }) {
  const fileName = cvLink ? cvLink.split('/').pop() : null;

  return (
    <div className="register-field" style={{ marginBottom: 18 }}>
      <label>CV Atual</label>
      {cvLink ? (
        <a
          href={cvLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#a3b6d9", display: "block", marginBottom: 6, fontWeight: "bold" }}
        >
          {fileName}
        </a>
      ) : (
        <span style={{ color: "#a3b6d9", fontSize: '0.95rem', marginBottom: 6 }}>
          Nenhum CV enviado
        </span>
      )}

      <label htmlFor="cv-upload" className="custom-file-label">
        {cvLink ? "Atualizar CV" : "Adicionar CV"}
      </label>
      <input
        id="cv-upload"
        type="file"
        name="cv"
        accept=".pdf,.doc,.docx"
        style={{ display: "none" }}
        onChange={onChange}
      />
      {selectedCV && <span style={{ marginLeft: 10 }}>{selectedCV.name}</span>}
    </div>
  );
}

export default CVUpload;
