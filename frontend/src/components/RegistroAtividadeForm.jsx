import React, { useState, useEffect } from 'react';
import { getRegistrosAtividades, createRegistroAtividade, deleteRegistroAtividade } from '../services/api'; // Importando funções de api.js
import { Button, Table, Form, Alert } from 'react-bootstrap';

const RegistroAtividadeForm = () => {
    const [registros, setRegistros] = useState([]);
    const [formData, setFormData] = useState({ idAtividade: '', idAluno: '', entrega: '' });
    const [loading, setLoading] = useState(false); // Controle de carregamento
    const [error, setError] = useState(''); // Controle de erro

    useEffect(() => {
        fetchRegistros();
    }, []);

    const fetchRegistros = async () => {
        setLoading(true);
        try {
            const response = await getRegistrosAtividades();
            setRegistros(response);
            setError('');
        } catch (err) {
            setError('Erro ao carregar registros de atividades');
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
        createRegistroAtividade(formData)
            .then(response => {
                setRegistros([...registros, response]);
                setFormData({ idAtividade: '', idAluno: '', entrega: '' });
                setError('');
            })
            .catch(error => {
                setError('Erro ao registrar atividade');
                console.error(error);
            })
            .finally(() => setLoading(false));
    };

    const handleDelete = (id) => {
        setLoading(true);
        deleteRegistroAtividade(id)
            .then(() => {
                setRegistros(registros.filter(item => item.id !== id));
                setError('');
            })
            .catch(error => {
                setError('Erro ao excluir registro de atividade');
                console.error(error);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="container">
            <h2 className="my-4">Gerenciar Registros de Atividades</h2>

            {/* Exibindo mensagens de erro */}
            {error && <Alert variant="danger">{error}</Alert>}
            
            {/* Formulário de registro de atividade */}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Atividade</Form.Label>
                    <Form.Control
                        type="text"
                        name="idAtividade"
                        value={formData.idAtividade}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Aluno</Form.Label>
                    <Form.Control
                        type="text"
                        name="idAluno"
                        value={formData.idAluno}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Entrega</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="entrega"
                        value={formData.entrega}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Carregando...' : 'Salvar'}
                </Button>
            </Form>

            {/* Lista de registros de atividades */}
            <h3 className="my-4">Registros de Atividades</h3>
            {loading ? (
                <p>Carregando registros...</p>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Atividade</th>
                            <th>Aluno</th>
                            <th>Entrega</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registros.length > 0 ? (
                            registros.map(registro => (
                                <tr key={registro.id}>
                                    <td>{registro.idAtividade}</td>
                                    <td>{registro.idAluno}</td>
                                    <td>{registro.entrega}</td>
                                    <td>
                                        <Button 
                                            variant="danger" 
                                            onClick={() => handleDelete(registro.id)} 
                                            disabled={loading}>
                                            {loading ? 'Excluindo...' : 'Excluir'}
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">Nenhum registro encontrado</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default RegistroAtividadeForm;
