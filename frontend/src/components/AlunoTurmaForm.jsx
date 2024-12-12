import React, { useState, useEffect } from 'react';
import { getAlunos, getTurmas, associateAlunoToTurma } from '../services/api';

const AlunoTurmaForm = () => {
    const [alunos, setAlunos] = useState([]);
    const [turmas, setTurmas] = useState([]);
    const [formData, setFormData] = useState({ alunoId: '', turmaId: '' });
    const [error, setError] = useState(''); 

    useEffect(() => {
        // Carregar alunos
        getAlunos()
            .then(response => setAlunos(response))
            .catch(error => console.error('Erro ao buscar alunos:', error));

        // Carregar turmas
        getTurmas()
            .then(response => setTurmas(response))
            .catch(error => console.error('Erro ao buscar turmas:', error));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Tentar associar o aluno à turma
            await associateAlunoToTurma(formData.alunoId, formData.turmaId);
            setFormData({ alunoId: '', turmaId: '' });  // Limpar os campos do formulário
            setError('');  // Resetar qualquer erro anterior
        } catch (err) {
            setError('Erro ao associar aluno à turma.');  // Exibir mensagem de erro
        }
    };

    return (
        <div className="container">
            <h2>Associar Aluno a Turma</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Aluno</label>
                    <select 
                        className="form-control" 
                        name="alunoId" 
                        value={formData.alunoId} 
                        onChange={handleChange}
                    >
                        <option value="">Selecione</option>
                        {alunos.map(aluno => (
                            <option key={aluno.id_usuario} value={aluno.id_usuario}>
                                {aluno.nome_completo}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Turma</label>
                    <select 
                        className="form-control" 
                        name="turmaId" 
                        value={formData.turmaId} 
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
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary">Associar</button>
            </form>
        </div>
    );
};

export default AlunoTurmaForm;
