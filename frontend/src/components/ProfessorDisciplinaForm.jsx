import React, { useState, useEffect } from 'react';
import { getProfessoresDisciplinas, createProfessorDisciplina, deleteProfessorDisciplina } from '../services/api'; // Importando funções de api.js
import { Button, Table, Form } from 'react-bootstrap';

const ProfessorDisciplinaForm = () => {
    const [professoresDisciplinas, setProfessoresDisciplinas] = useState([]);
    const [formData, setFormData] = useState({ idProfessor: '', idDisciplina: '' });
    const [loading, setLoading] = useState(false); // Controle de carregamento
    const [error, setError] = useState(''); // Controle de erro

    useEffect(() => {
        fetchProfessoresDisciplinas();
    }, []);

    const fetchProfessoresDisciplinas = async () => {
        setLoading(true);
        try {
            const response = await getProfessoresDisciplinas();
            setProfessoresDisciplinas(response);
            setError('');
        } catch (err) {
            setError('Erro ao carregar professores e disciplinas');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createProfessorDisciplina(formData)
            .then(response => {
                setProfessoresDisciplinas([...professoresDisciplinas, response]);
                setFormData({ idProfessor: '', idDisciplina: '' });
                setError('');
            })
            .catch(error => {
                setError('Erro ao associar professor e disciplina');
                console.error(error);
            })
            .finally(() => setLoading(false));
    };

    const handleDelete = (id) => {
        setLoading(true);
        deleteProfessorDisciplina(id)
            .then(() => {
                setProfessoresDisciplinas(professoresDisciplinas.filter(item => item.id !== id));
                setError('');
            })
            .catch(error => {
                setError('Erro ao excluir associação entre professor e disciplina');
                console.error(error);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="container">
            <h2 className="my-4">Gerenciar Professores e Disciplinas</h2>
            
            {/* Exibindo mensagens de erro */}
            {error && <div className="alert alert-danger">{error}</div>}
            
            {/* Formulário de associação */}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Professor</Form.Label>
                    <Form.Control
                        type="text"
                        name="idProfessor"
                        value={formData.idProfessor}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Disciplina</Form.Label>
                    <Form.Control
                        type="text"
                        name="idDisciplina"
                        value={formData.idDisciplina}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Carregando...' : 'Associar'}
                </Button>
            </Form>

            {/* Lista de professores e disciplinas */}
            <h3 className="my-4">Professores e Disciplinas</h3>
            {loading ? (
                <p>Carregando associações...</p>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Professor</th>
                            <th>Disciplina</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {professoresDisciplinas.length > 0 ? (
                            professoresDisciplinas.map(item => (
                                <tr key={item.id}>
                                    <td>{item.idProfessor}</td>
                                    <td>{item.idDisciplina}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => handleDelete(item.id)} disabled={loading}>
                                            {loading ? 'Excluindo...' : 'Excluir'}
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">Nenhuma associação encontrada</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default ProfessorDisciplinaForm;
