import React, { useEffect, useState } from 'react';
import {useNavigate, Link} from "react-router-dom";
import axios from 'axios';
import '../../../Assets/Styles/Pages/RegisterForms.css';

const PerfilCandidato = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const candidatoId = user.id;
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        user: {
            username: '',
            email: '',
            first_name: '',
            last_name: '',
        },
        telefone: '',
        descricao: '',
        imagem: '',
        cv: '',
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
            } catch (error) {
                setErrorMessage('Erro ao carregar dados do perfil.');
            }
        };
        fetchData();
    }, [candidatoId]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'imagem') {
            setSelectedImage(files[0]);
        } else if (name === 'cv') {
            setSelectedCV(files[0]);
        } else if (["username", "email", "first_name", "last_name"].includes(name)) {
            setFormData(prev => ({
                ...prev,
                user: { ...prev.user, [name]: value }
            }));
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
        } catch (error) {
            setErrorMessage('Erro ao guardar as alterações.');
            setSuccessMessage('');
        }
    };

    const handleLogout = async () => {
        await axios.post('http://localhost:8000/db_iscternship/logout/');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    // Corrigir URL da imagem
    const imgSrc = formData.imagem
        ? (formData.imagem.startsWith('http')
            ? formData.imagem
            : `http://localhost:8000/${formData.imagem}`)
        : 'profile_pics/default.png';

    // Corrigir URL do CV (só mostra link se existir e não for 'empty.pdf')
    const cvLink = (formData.cv && !formData.cv.includes('empty.pdf'))
        ? (formData.cv.startsWith('http')
            ? formData.cv
            : `http://localhost:8000/${formData.cv}`)
        : null;

    return (
        <div className="register-container">
            <form className="register-box" onSubmit={handleSubmit} encType="multipart/form-data">
                <h2 className="register-title">Olá, {formData.user.username}</h2>

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                    <img
                        src={imgSrc}
                        alt="Perfil"
                        width={120}
                        height={120}
                        style={{ borderRadius: '50%', objectFit: 'cover', border: '2px solid #7d9ce4' }}
                        onError={e => { e.target.src = '/default.png'; }}
                    />
                </div>
                
                <div className="register-field" style={{ marginBottom: 18 }}>
                  <label htmlFor="imagem-upload" className="custom-file-label">
                    Alterar imagem de perfil
                  </label>
                  <input
                    id="imagem-upload"
                    type="file"
                    name="imagem"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />
                  {selectedImage && <span>{selectedImage.name}</span>}
                </div>

                <div className="register-field" style={{ marginBottom: 18 }}>
                  <label>CV Atual</label>
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
                      {formData.cv.split('/').pop()}
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
                    onChange={handleChange}
                  />
                  {selectedCV && <span style={{marginLeft: 10}}>{selectedCV.name}</span>}
                </div>

                <div style={{ display: 'flex', gap: 24 }}>
                    <div style={{ flex: 1 }}>
                        <div className="register-field">
                            <label>Username</label>
                            <input type="text" name="username" value={formData.user.username} disabled />
                        </div>
                        <div className="register-field">
                            <label>Primeiro Nome</label>
                            <input type="text" name="first_name" value={formData.user.first_name} onChange={handleChange} />
                        </div>
                        <div className="register-field">
                            <label>Último Nome</label>
                            <input type="text" name="last_name" value={formData.user.last_name} onChange={handleChange} />
                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <div className="register-field">
                            <label>Email</label>
                            <input type="email" name="email" value={formData.user.email} onChange={handleChange} />
                        </div>
                        <div className="register-field">
                            <label>Telefone</label>
                            <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} />
                        </div>
                        <div className="register-field">
                            <label>Descrição</label>
                            <textarea name="descricao" rows="3" value={formData.descricao} onChange={handleChange} />
                        </div>
                    </div>
                </div>

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
