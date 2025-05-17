import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../Assets/Styles/Pages/RegisterForms.css';
import { useNavigate } from "react-router-dom";
import ImagemPerfilUpload from '../../../Components/Mutual/ImagemPerfilUpload';
import FormPerfilEmpresa from '../../../Components/Empresa/PerfilEmpresa/FormPerfilEmpresa';

const PerfilEmpresa = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const empresaId = user.id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user: { username: '', email: '' },
    nome_empresa: '', morada: '', telefone: '', imagem: '',
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!empresaId) return;
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/db_iscternship/empresa/${empresaId}`);
        setFormData(response.data);
        setImageError(false);
      } catch {
        setErrorMessage('Erro ao carregar dados do perfil da empresa.');
      }
    };
    fetchData();
  }, [empresaId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagem') setSelectedImage(files[0]);
    else if (["username", "email"].includes(name)) {
      setFormData(prev => ({ ...prev, user: { ...prev.user, [name]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('email', formData.user.email);
    data.append('nome_empresa', formData.nome_empresa);
    data.append('morada', formData.morada);
    data.append('telefone', formData.telefone);
    if (selectedImage) data.append('imagem', selectedImage);

    try {
      await axios.post(`http://localhost:8000/db_iscternship/empresa/${empresaId}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccessMessage('Perfil da empresa atualizado com sucesso!');
      setErrorMessage('');
      navigate(0);
    } catch {
      setErrorMessage('Erro ao guardar as alterações.');
      setSuccessMessage('');
    }
  };

  const handleLogout = async () => {
    await axios.post('http://localhost:8000/db_iscternship/logout/');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const imgSrc = !imageError && formData.imagem
    ? (formData.imagem.startsWith('http')
      ? formData.imagem
      : `http://localhost:8000/${formData.imagem}`)
    : '/default.png';

  return (
    <div className="register-container">
      <form className="register-box" onSubmit={handleSubmit} encType="multipart/form-data">
        <h2 className="register-title">Olá, {formData.user.username}</h2>

        <ImagemPerfilUpload
          imagemUrl={imgSrc}
          onError={e => { e.target.src = '/default.png'; }}
          onChange={handleChange}
          selectedImage={selectedImage}
        />

        <FormPerfilEmpresa formData={formData} handleChange={handleChange} />

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <div className="register-button-container" style={{ gap: 12 }}>
          <button type="submit" className="register-button">Guardar</button>
          <button type="button" className="register-button" style={{ background: '#c94a4a' }} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </form>
    </div>
  );
};

export default PerfilEmpresa;
