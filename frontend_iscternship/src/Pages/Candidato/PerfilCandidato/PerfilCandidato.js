import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../Assets/Styles/Pages/RegisterForms.css';

const PerfilCandidato = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const candidatoId = user.id;

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
    });

    const [selectedImage, setSelectedImage] = useState(null);
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
        // Usar FormData para aceitar imagem
        const data = new FormData();
        data.append('first_name', formData.user.first_name);
        data.append('last_name', formData.user.last_name);
        data.append('email', formData.user.email);
        data.append('telefone', formData.telefone);
        data.append('descricao', formData.descricao);
        if (selectedImage) data.append('imagem', selectedImage);

        try {
            await axios.post(
                `http://localhost:8000/db_iscternship/candidato/${candidatoId}`,
                data,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            setSuccessMessage('Perfil atualizado com sucesso!');
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

    // Constrói o URL da imagem do candidato
    const imgSrc = formData.imagem
        ? (formData.imagem.startsWith('http') ? formData.imagem : `http://localhost:8000/media/${formData.imagem}`)
        : '/default.png';

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
                    />
                </div>
                <div className="register-field" style={{ marginBottom: 24 }}>
                    <label>Alterar imagem de perfil</label>
                    <input type="file" name="imagem" accept="image/*" onChange={handleChange} />
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
