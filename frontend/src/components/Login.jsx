import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5005/login', { email, senha });
  
      if (response.data.success) {
        // Armazenar o id_usuario e tipo_usuario no localStorage
        localStorage.setItem('userId', response.data.id_usuario);
        localStorage.setItem('tipo_usuario', response.data.tipo_usuario);
  
        // Redirecionar para a página correta com base no tipo_usuario
        const tipoUsuario = response.data.tipo_usuario;
  
        if (tipoUsuario === 'Aluno') {
          navigate('/aluno');  // Navega para a página do Aluno
        } else if (tipoUsuario === 'Professor') {
          navigate('/professor');  // Navega para a página do Professor
        } else if (tipoUsuario === 'Coordenador') {
          navigate('/coordenador');  // Navega para a página do Coordenador
        }
      } else {
        setError('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Erro ao tentar realizar o login:', error);
      setError('Erro ao tentar autenticar. Tente novamente.');
    }
  };  

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Senha</label>
          <input
            type="password"
            className="form-control"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
