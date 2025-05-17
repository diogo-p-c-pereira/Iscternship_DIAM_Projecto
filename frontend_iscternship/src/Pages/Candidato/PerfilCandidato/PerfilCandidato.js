import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../../../Assets/Styles/Pages/RegisterForms.css';
import ImagemPerfilUpload from '../../../Components/Mutual/ImagemPerfilUpload';
import CVUpload from '../../../Components/Candidato/PerfilCandidato/CVUpload';
import FormPerfilCandidato from '../../../Components/Candidato/PerfilCandidato/FormPerfilCandidato';

const PerfilCandidato = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const candidatoId = user.id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user: { username: '', email: '', first_name: '', last_name: '' },
    telefone: '', descricao: '', imagem: '', cv: ''
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCV, setSelectedCV] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!candidatoId) return;
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/db_iscternship/candidato/${candidatoId}`);
        setFormData(response.data);
      } catch {
        setErrorMessage('Erro ao carregar dados do perfil.');
      }
    };
    fetchData();
  }, [candidatoId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagem') setSelectedImage(files[0]);
    else if (name === 'cv') setSelectedCV(files[0]);
    else if (["username", "email", "first_name", "last_name"].includes(name)) {
      setFormData(prev => ({ ...prev, user: { ...prev.user, [name]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('first_name', formData.user.first_name);
    data.append('last_name', formData.user.last_name);
    data.append('email', formData.user.email);
    data.append('telefone', formData.telefone);
    data.append('descricao', formData.descricao);
    if (selectedImage) data.append('imagem', selectedImage);
    if (selectedCV) data.append('cv', selectedCV);

    try {
      await axios.post(
        `http://localhost:8000/db_iscternship/candidato/${candidatoId}`,
        data,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setSuccessMessage('Perfil atualizado com sucesso!');
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

  const imgSrc = formData.imagem
    ? (formData.imagem.startsWith('http') ? formData.imagem : `http://localhost:8000/${formData.imagem}`)
    : 'profile_pics/default.png';

  const cvLink = (formData.cv && !formData.cv.includes('empty.pdf'))
    ? (formData.cv.startsWith('http') ? formData.cv : `http://localhost:8000/${formData.cv}`)
    : null;

  return (
    <div className="register-container">
      <form className="register-box" onSubmit={handleSubmit} encType="multipart/form-data">
        <h2 className="register-title">Olá, {formData.user.first_name}</h2>

        <ImagemPerfilUpload
          imagemUrl={imgSrc}
          onError={e => { e.target.src = '/default.png'; }}
          onChange={handleChange}
          selectedImage={selectedImage}
        />

        <CVUpload
          cvLink={cvLink}
          selectedCV={selectedCV}
          onChange={handleChange}
        />

        <FormPerfilCandidato
          formData={formData}
          handleChange={handleChange}
        />

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

export default PerfilCandidato;
