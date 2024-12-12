import React, { useState, useEffect } from 'react';
import { getAtividades, createAtividade, updateAtividade, deleteAtividade, getTurmas } from '../services/api'; // Certifique-se de que getTurmas está sendo importado

const AtividadeForm = () => {
    const [atividades, setAtividades] = useState([]);
    const [turmas, setTurmas] = useState([]);
    const [formData, setFormData] = useState({ nome: '', descricao: '', idTurma: '' });

    // Carregar as atividades e turmas ao montar o componente
    useEffect(() => {
        getAtividades()
            .then(response => setAtividades(response))
            .catch(error => console.error("Erro ao buscar atividades:", error));

        getTurmas()
            .then(response => setTurmas(response))
            .catch(error => console.error("Erro ao buscar turmas:", error));
    }, []);

    // Manipulador de mudança no formulário
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Manipulador de envio do formulário (criação ou atualização)
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (formData.id) {
            // Atualizar atividade
            updateAtividade(formData.id, formData)
                .then(response => {
                    setAtividades(prev => prev.map(item => item.id === formData.id ? response : item));
                    setFormData({ nome: '', descricao: '', idTurma: '' });
                })
                .catch(error => console.error("Erro ao atualizar atividade:", error));
        } else {
            // Criar nova atividade
            createAtividade(formData)
                .then(response => {
                    setAtividades([...atividades, response]);
                    setFormData({ nome: '', descricao: '', idTurma: '' });
                })
                .catch(error => console.error("Erro ao criar atividade:", error));
        }
    };

    // Manipulador de exclusão
    const handleDelete = (id) => {
        deleteAtividade(id)
            .then(() => setAtividades(atividades.filter(item => item.id !== id)))
            .catch(error => console.error("Erro ao excluir atividade:", error));
    };

    return (
        <div className="container">
            <h2>Gerenciar Atividades</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="nome" 
                        value={formData.nome} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label>Descrição</label>
                    <textarea 
                        className="form-control" 
                        name="descricao" 
                        value={formData.descricao} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label>Turma</label>
                    <select 
                        className="form-control" 
                        name="idTurma" 
                        value={formData.idTurma} 
                        onChange={handleChange}
                    >
                        <option value="">Selecione</option>
                        {turmas.map(turma => (
                            <option key={turma.id_turma} value={turma.id_turma}>
                                {turma.nome_turma}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Salvar</button>
            </form>

            <h3>Atividades</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Turma</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {atividades.map(atividade => (
                        <tr key={atividade.id}>
                            <td>{atividade.nome}</td>
                            <td>{atividade.descricao}</td>
                            <td>{atividade.idTurma}</td>
                            <td>
                                <button 
                                    className="btn btn-warning" 
                                    onClick={() => setFormData({ nome: atividade.nome, descricao: atividade.descricao, idTurma: atividade.idTurma, id: atividade.id })}
                                >
                                    Editar
                                </button>
                                <button 
                                    className="btn btn-danger" 
                                    onClick={() => handleDelete(atividade.id)}
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AtividadeForm;
