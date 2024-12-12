import React, { useState, useEffect } from 'react';
import { getDisciplinas, createDisciplina, updateDisciplina, deleteDisciplina } from '../services/api';
import { Button, Table, Form, Alert, Spinner } from 'react-bootstrap';

const DisciplinaForm = () => {
  const [disciplinas, setDisciplinas] = useState([]); // Inicializa como um array vazio
  const [disciplina, setDisciplina] = useState({ nome_disciplina: '' });
  const [loading, setLoading] = useState(false); // Para indicar se a aplicação está carregando dados
  const [error, setError] = useState(''); // Para mostrar mensagens de erro
  const [success, setSuccess] = useState(''); // Para mostrar mensagens de sucesso

  useEffect(() => {
    fetchDisciplinas();
  }, []);

  const fetchDisciplinas = async () => {
    setLoading(true); // Define o estado de carregamento como true
    setError(''); // Limpa qualquer mensagem de erro
    setSuccess(''); // Limpa qualquer mensagem de sucesso
    try {
      const response = await getDisciplinas();
      setDisciplinas(response.data || []); // Garante que seja um array mesmo que os dados estejam vazios
    } catch (err) {
      setError('Erro ao buscar disciplinas');
      console.error("Erro ao buscar disciplinas", err);
    } finally {
      setLoading(false); // Define o estado de carregamento como false
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDisciplina({ ...disciplina, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Inicia o carregamento enquanto processa a requisição
    setError('');
    setSuccess('');
    try {
      if (disciplina.id) {
        await updateDisciplina(disciplina.id, disciplina);
        setSuccess('Disciplina atualizada com sucesso!');
      } else {
        await createDisciplina(disciplina);
        setSuccess('Disciplina cadastrada com sucesso!');
      }
      fetchDisciplinas(); // Recarrega a lista de disciplinas
      setDisciplina({ nome_disciplina: '' }); // Limpa o formulário
    } catch (err) {
      setError('Erro ao salvar disciplina');
      console.error("Erro ao salvar disciplina", err);
    } finally {
      setLoading(false); // Termina o carregamento
    }
  };

  const handleEdit = (disciplina) => {
    setDisciplina(disciplina);
    setSuccess(''); // Limpa mensagens de sucesso ao editar
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta disciplina?')) {
      setLoading(true);
      setError('');
      setSuccess('');
      try {
        await deleteDisciplina(id);
        setSuccess('Disciplina deletada com sucesso!');
        fetchDisciplinas();
      } catch (err) {
        setError('Erro ao deletar disciplina');
        console.error("Erro ao deletar disciplina", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Gerenciar Disciplinas</h2>

      {/* Exibindo mensagens de erro ou sucesso */}
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome da Disciplina</Form.Label>
          <Form.Control 
            type="text" 
            name="nome_disciplina" 
            value={disciplina.nome_disciplina} 
            onChange={handleChange} 
            required 
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : (disciplina.id ? 'Atualizar Disciplina' : 'Cadastrar Disciplina')}
        </Button>
      </Form>

      <h3 className="my-4">Lista de Disciplinas</h3>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {disciplinas.length > 0 ? (
              disciplinas.map((disciplina) => (
                <tr key={disciplina.id}>
                  <td>{disciplina.nome_disciplina}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleEdit(disciplina)}>Editar</Button>
                    <Button variant="danger" onClick={() => handleDelete(disciplina.id)}>Deletar</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center">Nenhuma disciplina cadastrada</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default DisciplinaForm;
