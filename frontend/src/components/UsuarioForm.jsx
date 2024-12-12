import React, { useState, useEffect } from 'react';
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from '../services/api';
import { Button, Table, Form, Alert, Spinner } from 'react-bootstrap';

const UsuarioForm = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState({
    nome_completo: '',
    email: '',
    senha: '',
    tipo_usuario: 'Aluno',
    telefone: '',
    foto_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await getUsuarios();
      if (Array.isArray(response.data)) {
        setUsuarios(response.data);
      } else {
        setError('Formato de dados inválido.');
      }
    } catch (error) {
      setError('Erro ao carregar usuários.');
      console.error('Erro ao buscar usuários', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      if (usuario.id) {
        await updateUsuario(usuario.id, usuario);
        setSuccess('Usuário atualizado com sucesso!');
      } else {
        await createUsuario(usuario);
        setSuccess('Usuário cadastrado com sucesso!');
      }
      fetchUsuarios();
      setUsuario({
        nome_completo: '',
        email: '',
        senha: '',
        tipo_usuario: 'Aluno',
        telefone: '',
        foto_url: ''
      });
    } catch (error) {
      setError('Erro ao salvar usuário.');
      console.error('Erro ao salvar usuário', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (usuario) => {
    setUsuario(usuario);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este usuário?')) {
      setLoading(true);
      setError('');
      setSuccess('');
      try {
        await deleteUsuario(id);
        setSuccess('Usuário deletado com sucesso!');
        fetchUsuarios();
      } catch (error) {
        setError('Erro ao deletar usuário.');
        console.error('Erro ao deletar usuário', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Gerenciar Usuários</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome Completo</Form.Label>
          <Form.Control
            type="text"
            name="nome_completo"
            value={usuario.nome_completo}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={usuario.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            name="senha"
            value={usuario.senha}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Telefone</Form.Label>
          <Form.Control
            type="text"
            name="telefone"
            value={usuario.telefone}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Foto URL</Form.Label>
          <Form.Control
            type="text"
            name="foto_url"
            value={usuario.foto_url}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tipo de Usuário</Form.Label>
          <Form.Select name="tipo_usuario" value={usuario.tipo_usuario} onChange={handleChange}>
            <option value="Aluno">Aluno</option>
            <option value="Professor">Professor</option>
            <option value="Coordenador">Coordenador</option>
            <option value="Administrador">Administrador</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : usuario.id ? 'Atualizar Usuário' : 'Cadastrar Usuário'}
        </Button>
      </Form>

      <h3 className="my-4">Lista de Usuários</h3>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Foto</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios && usuarios.length > 0 ? (
              usuarios.map((user) => (
                <tr key={user.id}>
                  <td>{user.nome_completo}</td>
                  <td>{user.email}</td>
                  <td>{user.telefone}</td>
                  <td>{user.foto_url}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleEdit(user)}>Editar</Button>
                    <Button variant="danger" onClick={() => handleDelete(user.id)}>Deletar</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">Nenhum usuário encontrado</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UsuarioForm;
