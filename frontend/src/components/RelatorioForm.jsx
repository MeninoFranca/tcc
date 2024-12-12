import React, { useState, useEffect } from 'react';
import { getRelatorios, getRelatoriosByTurmaDisciplina } from '../services/api'; // Importando funções de api.js
import { Form, Button, Table, Alert, Spinner } from 'react-bootstrap';

const RelatorioForm = () => {
  const [relatorios, setRelatorios] = useState([]);
  const [idTurma, setIdTurma] = useState('');
  const [idDisciplina, setIdDisciplina] = useState('');
  const [loading, setLoading] = useState(false); // Controle de carregamento
  const [error, setError] = useState(''); // Controle de erro

  useEffect(() => {
    // Buscar todos os relatórios ao montar o componente
    fetchRelatorios();
  }, []);

  const fetchRelatorios = async () => {
    setLoading(true);
    try {
      const response = await getRelatorios();
      setRelatorios(response);
      setError('');
    } catch (error) {
      setError('Erro ao carregar relatórios');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!idTurma || !idDisciplina) {
      setError('Por favor, insira a Turma e a Disciplina.');
      return;
    }
    setLoading(true);
    getRelatoriosByTurmaDisciplina(idTurma, idDisciplina)
      .then(response => {
        setRelatorios(response);
        setError('');
      })
      .catch(error => {
        setError('Erro ao gerar relatório');
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <h3>Relatórios de Desempenho</h3>

      {/* Exibindo mensagens de erro */}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formIdTurma">
          <Form.Label>Turma</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="ID da Turma" 
            value={idTurma} 
            onChange={(e) => setIdTurma(e.target.value)} 
            required
          />
        </Form.Group>

        <Form.Group controlId="formIdDisciplina">
          <Form.Label>Disciplina</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="ID da Disciplina" 
            value={idDisciplina} 
            onChange={(e) => setIdDisciplina(e.target.value)} 
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Gerando Relatório...' : 'Gerar Relatório'}
        </Button>
      </Form>

      {/* Exibição de spinner enquanto carrega */}
      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>ID do Relatório</th>
              <th>ID da Turma</th>
              <th>ID da Disciplina</th>
              <th>Detalhes</th>
            </tr>
          </thead>
          <tbody>
            {relatorios.length > 0 ? (
              relatorios.map((relatorio) => (
                <tr key={relatorio.id}>
                  <td>{relatorio.id}</td>
                  <td>{relatorio.id_turma}</td>
                  <td>{relatorio.id_disciplina}</td>
                  <td>{relatorio.detalhes}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">Nenhum relatório encontrado</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default RelatorioForm;
