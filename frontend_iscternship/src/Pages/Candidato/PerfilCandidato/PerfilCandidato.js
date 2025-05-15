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
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!candidatoId) return;

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/db_iscternship/candidato/${candidatoId}`);
                setFormData(response.data);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
                setErrorMessage('Erro ao carregar dados do perfil.');
            }
        };

        fetchData();
    }, [candidatoId]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (["username", "email", "first_name", "last_name"].includes(name)) {
            setFormData(prev => ({
                ...prev,
                user: {
                    ...prev.user,
                    [name]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8000/db_iscternship/candidato/${candidatoId}`, formData);
            setSuccessMessage('Perfil atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao guardar:', error);
            setErrorMessage('Erro ao guardar as alterações.');
        }
    };

    return (
        <div className="register-container">
            <form className="register-box" onSubmit={handleSubmit}>
                <h2 className="register-title">Olá, {formData.user.username}</h2>

                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

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

                <div className="register-button-container">
                    <button type="submit" className="register-button">Guardar</button>
                </div>
            </form>
        </div>
    );
};

export default PerfilCandidato;
