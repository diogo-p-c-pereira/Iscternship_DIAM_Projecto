import React from "react";

function ImagemPerfilUpload({ imagemUrl, onError, onChange, selectedImage }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
      <img
        src={imagemUrl}
        alt="Perfil"
        width={120}
        height={120}
        style={{ borderRadius: '50%', objectFit: 'cover', border: '2px solid #7d9ce4', marginBottom: 10 }}
        onError={onError}
      />
      <label htmlFor="imagem-upload" className="custom-file-label" style={{ marginTop: 10 }}>
        Alterar imagem de perfil
      </label>
      <input
        id="imagem-upload"
        type="file"
        name="imagem"
        accept="image/*"
        style={{ display: "none" }}
        onChange={onChange}
      />
      {selectedImage && <span>{selectedImage.name}</span>}
    </div>
  );
}

export default ImagemPerfilUpload;
