import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { getDesempenhos, createDesempenho } from '../services/api'; // Importando as funções de api.js

const DesempenhoForm = () => {
  const [desempenhos, setDesempenhos] = useState([]);
  const [nota, setNota] = useState('');
  const [feedback, setFeedback] = useState('');
  const [idAluno, setIdAluno] = useState('');
  const [idTurma, setIdTurma] = useState('');
  const [idDisciplina, setIdDisciplina] = useState('');

  useEffect(() => {
    // Buscar dados de desempenho ao montar o componente
    getDesempenhos()
      .then(response => setDesempenhos(response)) // Resposta já é o array de desempenhos
      .catch(error => console.error('Erro ao carregar desempenho:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const desempenhoData = {
      id_aluno: idAluno,
      id_turma: idTurma,
      id_disciplina: idDisciplina,
      nota,
      feedback,
    };

    createDesempenho(desempenhoData)
      .then(response => {
        // Atualizar a lista de desempenhos com o novo item
        setDesempenhos([...desempenhos, response]);
        // Limpar os campos do formulário após o envio
        setNota('');
        setFeedback('');
        setIdAluno('');
        setIdTurma('');
        setIdDisciplina('');
      })
      .catch(error => console.error('Erro ao cadastrar desempenho:', error));
  };

  return (
    <div>
      <h3>Desempenho dos Alunos</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formIdAluno">
          <Form.Label>Aluno</Form.Label>
          <Form.Control
            type="text"
            placeholder="ID do Aluno"
            value={idAluno}
            onChange={(e) => setIdAluno(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formIdTurma">
          <Form.Label>Turma</Form.Label>
          <Form.Control
            type="text"
            placeholder="ID da Turma"
            value={idTurma}
            onChange={(e) => setIdTurma(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formIdDisciplina">
          <Form.Label>Disciplina</Form.Label>
          <Form.Control
            type="text"
            placeholder="ID da Disciplina"
            value={idDisciplina}
            onChange={(e) => setIdDisciplina(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formNota">
          <Form.Label>Nota</Form.Label>
          <Form.Control
            type="number" // Agora o campo de nota é do tipo "number"
            placeholder="Nota do Aluno"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            min="0" // Valor mínimo
            max="10" // Valor máximo
          />
        </Form.Group>

        <Form.Group controlId="formFeedback">
          <Form.Label>Feedback</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Feedback do Professor"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">Salvar</Button>
      </Form>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID do Aluno</th>
            <th>ID da Turma</th>
            <th>ID da Disciplina</th>
            <th>Nota</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {desempenhos.length > 0 ? (
            desempenhos.map((desempenho) => (
              <tr key={desempenho.id}>
                <td>{desempenho.id_aluno}</td>
                <td>{desempenho.id_turma}</td>
                <td>{desempenho.id_disciplina}</td>
                <td>{desempenho.nota}</td>
                <td>{desempenho.feedback}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">Nenhum desempenho registrado</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default DesempenhoForm;
