import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Row, Col, Button, Card } from 'react-bootstrap';
import UsuarioForm from '../components/UsuarioForm';  // Formulário de usuários
import TurmaForm from '../components/TurmaForm';      // Formulário de turmas
import DisciplinaForm from '../components/DisciplinaForm'; // Formulário de disciplinas

const Administrador = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('usuarios');  // Controlar a aba ativa
  const [userType, setUserType] = useState('');

  useEffect(() => {
    // Verifica se o usuário está logado
    const userId = localStorage.getItem('userId');
    const tipoUsuario = localStorage.getItem('tipo_usuario');
    
    if (!userId) {
      navigate('/');  // Redireciona para o login se o usuário não estiver logado
    } else {
      setUserType(tipoUsuario); // Atualiza o tipo de usuário (Administrador, Coordenador, Aluno, etc.)
    }
  }, [navigate]);

  // Condicional para permitir acesso apenas para Administradores e Coordenadores
  if (userType !== 'Administrador' && userType !== 'Coordenador') {
    return (
      <Container className="mt-4">
        <h2>Acesso negado</h2>
        <p>Você não tem permissão para acessar esta página.</p>
      </Container>
    );
  }

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand>Agenda Escolar</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ml-auto">
            {/* Renderiza o link de 'Aluno' apenas se o usuário for Admin ou Coordenador */}
            {userType === 'Administrador' || userType === 'Coordenador' ? (
              <>
               
              </>
            ) : null}

            <Nav.Link href="#" onClick={() => {
              localStorage.removeItem('userId');
              localStorage.removeItem('tipo_usuario');
              navigate('/');  // Navega para a página de login ao sair
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
                <Card.Title>Gerenciamento</Card.Title>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link onClick={() => setActiveTab('usuarios')}>Usuários</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={() => setActiveTab('turmas')}>Turmas</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={() => setActiveTab('disciplinas')}>Disciplinas</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={() => setActiveTab('relatorios')}>Relatórios</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>

          {/* Conteúdo da página */}
          <Col sm={12} md={9}>
            {activeTab === 'usuarios' && (
              <div>
                <h2>Cadastrar Usuários</h2>
                <UsuarioForm />
              </div>
            )}

            {activeTab === 'turmas' && (
              <div>
                <h2>Cadastrar Turmas</h2>
                <TurmaForm />
              </div>
            )}

            {activeTab === 'disciplinas' && (
              <div>
                <h2>Cadastrar Disciplinas</h2>
                <DisciplinaForm />
              </div>
            )}

            {activeTab === 'relatorios' && (
              <div>
                <h2>Relatórios de Desempenho</h2>
                <p>Aqui você pode visualizar o desempenho dos alunos nas turmas e disciplinas.</p>
                {/* Aqui poderia ser um componente que chama a API para gerar relatórios */}
                <Button variant="primary">Gerar Relatório</Button>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Administrador;
