import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../Assets/Styles/Pages/RegisterForms.css';

const PerfilEmpresa = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const empresaId = user.id;

    const [formData, setFormData] = useState({
        user: {
            username: '',
            email: '',
        },
        nome_empresa: '',
        morada: '',
        telefone: '',
        imagem: '',
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
            } catch (error) {
                setErrorMessage('Erro ao carregar dados do perfil da empresa.');
            }
        };
        fetchData();
    }, [empresaId]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'imagem') {
            setSelectedImage(files[0]);
        } else if (["username", "email"].includes(name)) {
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
        data.append('email', formData.user.email);
        data.append('nome_empresa', formData.nome_empresa);
        data.append('morada', formData.morada);
        data.append('telefone', formData.telefone);
        if (selectedImage) data.append('imagem', selectedImage);

        try {
            await axios.post(
                `http://localhost:8000/db_iscternship/empresa/${empresaId}`,
                data,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            setSuccessMessage('Perfil da empresa atualizado com sucesso!');
            setErrorMessage('');
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

    const imgSrc = !imageError && formData.imagem
        ? (formData.imagem.startsWith('http')
            ? formData.imagem
            : `http://localhost:8000/${formData.imagem}`)
        : '/default.png';

    return (
        <div className="register-container">
            <form className="register-box" onSubmit={handleSubmit} encType="multipart/form-data">
                <h2 className="register-title">Olá, {formData.user.username}</h2>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
                  <img
                    src={imgSrc}
                    alt="Perfil"
                    width={120}
                    height={120}
                    style={{ borderRadius: '50%', objectFit: 'cover', border: '2px solid #7d9ce4', marginBottom: 10 }}
                    onError={e => { e.target.src = '/default.png'; }}
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
                    onChange={handleChange}
                  />
                  {selectedImage && <span>{selectedImage.name}</span>}
                </div>

       

                <div style={{ display: 'flex', gap: 24 }}>
                    <div style={{ flex: 1 }}>
                        <div className="register-field">
                            <label>Username</label>
                            <input type="text" name="username" value={formData.user.username} disabled />
                        </div>
                        <div className="register-field">
                            <label>Email</label>
                            <input type="email" name="email" value={formData.user.email} onChange={handleChange} />
                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <div className="register-field">
                            <label>Nome da Empresa</label>
                            <input type="text" name="nome_empresa" value={formData.nome_empresa} onChange={handleChange} />
                        </div>
                        <div className="register-field">
                            <label>Morada</label>
                            <input type="text" name="morada" value={formData.morada} onChange={handleChange} />
                        </div>
                        <div className="register-field">
                            <label>Telefone</label>
                            <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} />
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

export default PerfilEmpresa;
