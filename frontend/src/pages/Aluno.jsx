import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Row, Col, Button, Table, Card } from 'react-bootstrap';
import AtividadeForm from '../components/AtividadeForm';      // Formulário de atividades
import DesempenhoForm from '../components/DesempenhoForm';    // Formulário de desempenho

const Aluno = () => {
  const navigate = useNavigate();
  const [atividadesPendentes, setAtividadesPendentes] = useState([]);
  const [atividadesEntregues, setAtividadesEntregues] = useState([]);
  const [desempenho, setDesempenho] = useState([]);
  
  useEffect(() => {
    // Verifica se o usuário está logado
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/');
    }

    // Fetch atividades pendentes e entregues
    const fetchAtividades = async () => {
      try {
        const userId = localStorage.getItem('userId');
        // Supondo que você tem uma API para buscar atividades pendentes e entregues
        const atividadesPendentesResponse = await fetch(`/api/atividades-pendentes/${userId}`);
        const atividadesEntreguesResponse = await fetch(`/api/atividades-entregues/${userId}`);
        const desempenhoResponse = await fetch(`/api/desempenho/${userId}`);
        
        const atividadesPendentesData = await atividadesPendentesResponse.json();
        const atividadesEntreguesData = await atividadesEntreguesResponse.json();
        const desempenhoData = await desempenhoResponse.json();
        
        setAtividadesPendentes(atividadesPendentesData);
        setAtividadesEntregues(atividadesEntreguesData);
        setDesempenho(desempenhoData);
      } catch (error) {
        console.error("Erro ao buscar atividades e desempenho", error);
      }
    };

    fetchAtividades();
  }, [navigate]);

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand>Agenda Escolar</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ml-auto">
            <Nav.Link href="/aluno">Aluno</Nav.Link>
            <Nav.Link href="/professor">Professor</Nav.Link>
            <Nav.Link href="/administrador">Administrador</Nav.Link>
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
                <Card.Title>Atividades do Aluno</Card.Title>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link>Atividades Pendentes</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link>Atividades Entregues</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link>Desempenho</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>

          {/* Conteúdo da página */}
          <Col sm={12} md={9}>
            <h2>Atividades Pendentes</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Descrição</th>
                  <th>Data de Entrega</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {atividadesPendentes.map((atividade) => (
                  <tr key={atividade.id}>
                    <td>{atividade.titulo}</td>
                    <td>{atividade.descricao}</td>
                    <td>{atividade.data_atividade}</td>
                    <td>
                      <Button variant="primary" href={`/entregar-atividade/${atividade.id}`}>Entregar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <h2>Atividades Entregues</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Data de Entrega</th>
                  <th>Status</th>
                  <th>Nota</th>
                  <th>Feedback</th>
                </tr>
              </thead>
              <tbody>
                {atividadesEntregues.map((atividade) => (
                  <tr key={atividade.id}>
                    <td>{atividade.titulo}</td>
                    <td>{atividade.data_atividade}</td>
                    <td>{atividade.status}</td>
                    <td>{atividade.nota}</td>
                    <td>{atividade.feedback}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <h2>Desempenho</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Disciplina</th>
                  <th>Nota</th>
                  <th>Feedback</th>
                </tr>
              </thead>
              <tbody>
                {desempenho.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nome_disciplina}</td>
                    <td>{item.nota}</td>
                    <td>{item.feedback}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Aluno;
