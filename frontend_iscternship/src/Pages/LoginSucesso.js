import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../UserProvider';
import axios from 'axios';

const PaginLoginCandidato = () => {
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Tenta terminar a sessão no backend
    try {
      await axios.post('http://localhost:8000/db_iscternship/logout/', {}, { withCredentials: true });
    } catch (e) {
      // Ignora erros (pode ser que a sessão já esteja terminada)
    }

    // Limpa o contexto do user e localStorage
    setUser(null);
    localStorage.removeItem('user');

    // Redireciona para login
    navigate('/login');
  };

  return (
    <div>
      <h2>Login com sucesso</h2>
      <button onClick={handleLogout} style={{ marginTop: '16px', padding: '8px 20px' }}>
        Logout
      </button>
    </div>
  );
};

export default PaginLoginCandidato;
