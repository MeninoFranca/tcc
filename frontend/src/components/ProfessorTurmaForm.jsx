import React, { useState, useEffect } from 'react';
import { getProfessoresTurmas, createProfessorTurma, deleteProfessorTurma } from '../services/api'; // Importando funções de api.js
import { Button, Table, Form } from 'react-bootstrap';

const ProfessorTurmaForm = () => {
    const [professoresTurmas, setProfessoresTurmas] = useState([]);
    const [formData, setFormData] = useState({ idProfessor: '', idTurma: '' });
    const [loading, setLoading] = useState(false); // Controle de carregamento
    const [error, setError] = useState(''); // Controle de erro

    useEffect(() => {
        fetchProfessoresTurmas();
    }, []);

    const fetchProfessoresTurmas = async () => {
        setLoading(true);
        try {
            const response = await getProfessoresTurmas();
            setProfessoresTurmas(response);
            setError('');
        } catch (err) {
            setError('Erro ao carregar professores e turmas');
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
        createProfessorTurma(formData)
            .then(response => {
                setProfessoresTurmas([...professoresTurmas, response]);
                setFormData({ idProfessor: '', idTurma: '' });
                setError('');
            })
            .catch(error => {
                setError('Erro ao associar professor e turma');
                console.error(error);
            })
            .finally(() => setLoading(false));
    };

    const handleDelete = (id) => {
        setLoading(true);
        deleteProfessorTurma(id)
            .then(() => {
                setProfessoresTurmas(professoresTurmas.filter(item => item.id !== id));
                setError('');
            })
            .catch(error => {
                setError('Erro ao excluir associação entre professor e turma');
                console.error(error);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="container">
            <h2 className="my-4">Gerenciar Professores e Turmas</h2>
            
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
                    <Form.Label>Turma</Form.Label>
                    <Form.Control
                        type="text"
                        name="idTurma"
                        value={formData.idTurma}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Carregando...' : 'Associar'}
                </Button>
            </Form>

            {/* Lista de professores e turmas */}
            <h3 className="my-4">Professores e Turmas</h3>
            {loading ? (
                <p>Carregando associações...</p>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Professor</th>
                            <th>Turma</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {professoresTurmas.length > 0 ? (
                            professoresTurmas.map(item => (
                                <tr key={item.id}>
                                    <td>{item.idProfessor}</td>
                                    <td>{item.idTurma}</td>
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

export default ProfessorTurmaForm;
