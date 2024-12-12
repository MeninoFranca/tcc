import React, { useState, useEffect } from 'react';
import { getTurmas, createTurma, updateTurma, deleteTurma } from '../services/api';
import { Button, Table, Form, Alert, Spinner } from 'react-bootstrap';

const TurmaForm = () => {
  const [turmas, setTurmas] = useState([]);  // Lista de turmas
  const [turma, setTurma] = useState({ nome_turma: '', turno: 'Manhã' });  // Formulário de turma
  const [loading, setLoading] = useState(false);  // Indicador de carregamento
  const [error, setError] = useState('');  // Mensagem de erro
  const [success, setSuccess] = useState('');  // Mensagem de sucesso

  useEffect(() => {
    fetchTurmas();
  }, []);

  // Função para buscar turmas
  const fetchTurmas = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await getTurmas();
      
      // Verifica se a resposta é um array
      if (Array.isArray(response.data)) {
        setTurmas(response.data);
      } else {
        setError('A resposta da API não contém uma lista válida de turmas.');
      }
    } catch (error) {
      setError('Erro ao carregar turmas.');
      console.error('Erro ao buscar turmas', error);
    } finally {
      setLoading(false);
    }
  };

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTurma({ ...turma, [name]: value });
  };

  // Função para submeter o formulário (criar ou atualizar turma)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      if (turma.id) {
        // Atualizar turma existente
        await updateTurma(turma.id, turma);
        setSuccess('Turma atualizada com sucesso!');
      } else {
        // Criar nova turma
        await createTurma(turma);
        setSuccess('Turma cadastrada com sucesso!');
      }
      fetchTurmas();  // Recarrega a lista de turmas
      setTurma({ nome_turma: '', turno: 'Manhã' });  // Limpa o formulário
    } catch (error) {
      setError('Erro ao salvar turma.');
      console.error('Erro ao salvar turma', error);
    } finally {
      setLoading(false);
    }
  };

  // Função para editar uma turma
  const handleEdit = (turma) => {
    if (!turma || !turma.id) {
      setError('Turma inválida para edição');
      return;
    }
    setTurma(turma);  // Preenche o formulário com os dados da turma
  };

  // Função para excluir uma turma
  const handleDelete = async (id) => {
    if (!id) {
      setError('ID inválido para deletar turma');
      return;
    }

    if (window.confirm('Tem certeza que deseja deletar esta turma?')) {
      setLoading(true);
      setError('');
      setSuccess('');
      try {
        await deleteTurma(id);
        setSuccess('Turma deletada com sucesso!');
        fetchTurmas();  // Recarrega a lista de turmas
      } catch (error) {
        setError('Erro ao deletar turma.');
        console.error('Erro ao deletar turma', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Gerenciar Turmas</h2>

      {/* Exibir mensagens de erro ou sucesso */}
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {/* Formulário para adicionar ou editar turma */}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome da Turma</Form.Label>
          <Form.Control
            type="text"
            name="nome_turma"
            value={turma.nome_turma}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Turno</Form.Label>
          <Form.Select name="turno" value={turma.turno} onChange={handleChange}>
            <option value="Manhã">Manhã</option>
            <option value="Tarde">Tarde</option>
            <option value="Noite">Noite</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : turma.id ? 'Atualizar Turma' : 'Cadastrar Turma'}
        </Button>
      </Form>

      {/* Lista de Turmas */}
      <h3 className="my-4">Lista de Turmas</h3>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Turno</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {turmas.length > 0 ? (
              turmas.map((turma) => (
                <tr key={turma.id}>
                  <td>{turma.nome_turma}</td>
                  <td>{turma.turno}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleEdit(turma)}>Editar</Button>
                    <Button variant="danger" onClick={() => handleDelete(turma.id)}>Deletar</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">Nenhuma turma encontrada.</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default TurmaForm;
