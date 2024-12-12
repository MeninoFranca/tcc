import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Row, Col, Button, Card, Table } from 'react-bootstrap';
import AtividadeForm from '../components/AtividadeForm';        // Formulário de atividades
import ProfessorDisciplinaForm from '../components/ProfessorDisciplinaForm'; // Formulário de disciplinas
import ProfessorTurmaForm from '../components/ProfessorTurmaForm'; // Formulário de turmas
import DesempenhoForm from '../components/DesempenhoForm';      // Formulário de desempenho

const Professor = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('turmas');
  const [disciplinas, setDisciplinas] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [atividades, setAtividades] = useState([]);
  
  useEffect(() => {
    // Verifica se o usuário está logado
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/');
    }

    // Fetch turmas e disciplinas associadas ao professor
    const fetchTurmasDisciplinas = async () => {
      try {
        const userId = localStorage.getItem('userId');
        // Supondo que você tem uma API para buscar as turmas e disciplinas associadas ao professor
        const turmasResponse = await fetch(`/api/turmas-professor/${userId}`);
        const disciplinasResponse = await fetch(`/api/disciplinas-professor/${userId}`);
        const turmasData = await turmasResponse.json();
        const disciplinasData = await disciplinasResponse.json();
        
        setTurmas(turmasData);
        setDisciplinas(disciplinasData);
      } catch (error) {
        console.error("Erro ao buscar turmas e disciplinas", error);
      }
    };

    fetchTurmasDisciplinas();
  }, [navigate]);

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand>Agenda Escolar</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/aluno">Aluno</Nav.Link>
            <Nav.Link as={Link} to="/professor">Professor</Nav.Link>
            <Nav.Link as={Link} to="/administrador">Administrador</Nav.Link>
            <Nav.Link href="#" onClick={() => {
              localStorage.removeItem('userId');
              localStorage.removeItem('tipo_usuario');
              navigate('/login');
            }}>Sair</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Container principal */}
      <Container className="mt-4">
        <Row>
          <Col sm={12} md={3}>
            <Card>
              <Card.Body>
                <Card.Title>Gerenciamento de Atividades</Card.Title>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link onClick={() => setActiveTab('turmas')}>Turmas</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={() => setActiveTab('disciplinas')}>Disciplinas</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={() => setActiveTab('atividades')}>Atividades</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={() => setActiveTab('desempenho')}>Desempenho</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>

          {/* Conteúdo da página */}
          <Col sm={12} md={9}>
            {activeTab === 'turmas' && (
              <div>
                <h2>Turmas Associadas</h2>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Nome da Turma</th>
                      <th>Turno</th>
                    </tr>
                  </thead>
                  <tbody>
                    {turmas.map(turma => (
                      <tr key={turma.id}>
                        <td>{turma.nome_turma}</td>
                        <td>{turma.turno}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}

            {activeTab === 'disciplinas' && (
              <div>
                <h2>Disciplinas Associadas</h2>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Nome da Disciplina</th>
                    </tr>
                  </thead>
                  <tbody>
                    {disciplinas.map(disciplina => (
                      <tr key={disciplina.id}>
                        <td>{disciplina.nome_disciplina}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}

            {activeTab === 'atividades' && (
              <div>
                <h2>Criar Atividades</h2>
                <AtividadeForm />
                <h3>Atividades Criadas</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Título</th>
                      <th>Disciplina</th>
                      <th>Turma</th>
                      <th>Data de Entrega</th>
                      <th>Dificuldade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {atividades.map(atividade => (
                      <tr key={atividade.id}>
                        <td>{atividade.titulo}</td>
                        <td>{atividade.nome_disciplina}</td>
                        <td>{atividade.nome_turma}</td>
                        <td>{atividade.data_atividade}</td>
                        <td>{atividade.dificuldade}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}

            {activeTab === 'desempenho' && (
              <div>
                <h2>Desempenho dos Alunos</h2>
                <DesempenhoForm />
                <h3>Desempenho por Atividade</h3>
                {/* A tabela de desempenho pode ser preenchida com dados da API */}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Professor;
