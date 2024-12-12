import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5005',
  timeout: 10000,
});

// Função para buscar todos os usuários
export const getUsuarios = async () => {
  try {
    const response = await api.get('/usuarios');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

// Função para buscar um usuário por ID
export const getUsuarioById = async (id) => {
  try {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar usuário com ID ${id}:`, error);
    throw error;
  }
};

// Função para criar um novo usuário
export const createUsuario = async (nome_completo, email, senha, telefone, foto_url, sexo, tipo_usuario, status) => {
  try {
    const response = await api.post('/usuarios', {nome_completo, email, senha, telefone, foto_url, sexo, tipo_usuario, status});
    return response.data;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
};

// Função para atualizar um usuário
export const updateUsuario = async (id, nome, email) => {
  try {
    const response = await api.put(`/usuarios/${id}`, { nome, email });
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar usuário com ID ${id}:`, error);
    throw error;
  }
};

// Função para deletar um usuário
export const deleteUsuario = async (id) => {
  try {
    const response = await api.delete(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao deletar usuário com ID ${id}:`, error);
    throw error;
  }
};
export const getTurmas = async () => {
  try {
    const response = await api.get('/turmas');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar turmas:", error);
    throw error; // Lança o erro para que a função chamadora possa tratá-lo
  }
};
// Função para obter uma turma específica pelo ID
export const getTurmaById = async (id) => {
  try {
    const response = await api.get(`/turmas/${id}`);
    return response.data; // Retorna os dados da turma específica
  } catch (error) {
    console.error(`Erro ao buscar turma com id ${id}:`, error);
    throw error; // Lança o erro
  }
};

// Função para criar uma nova turma
export const createTurma = async (nome, turno) => {
  try {
    const response = await api.post('/turmas', { nome, turno });
    return response.data; // Retorna os dados da nova turma criada
  } catch (error) {
    console.error("Erro ao criar turma:", error);
    throw error; // Lança o erro
  }
};

// Função para atualizar uma turma existente
export const updateTurma = async (id, nome, turno) => {
  try {
    const response = await api.put(`/turmas/${id}`, { nome, turno });
    return response.data; // Retorna a resposta da atualização
  } catch (error) {
    console.error(`Erro ao atualizar turma com id ${id}:`, error);
    throw error; // Lança o erro
  }
};

// Função para deletar uma turma
export const deleteTurma = async (id) => {
  try {
    const response = await api.delete(`/turmas/${id}`);
    return response.data; // Retorna a mensagem de sucesso
  } catch (error) {
    console.error(`Erro ao deletar turma com id ${id}:`, error);
    throw error; // Lança o erro
  }
};

export const getDisciplinas = async () => {
  try {
    const response = await api.get('/disciplinas');
    return response.data; // Retorna os dados das disciplinas
  } catch (error) {
    console.error("Erro ao obter as disciplinas:", error);
    throw error; // Lança o erro para ser tratado no componente
  }
};

// Função para criar uma nova disciplina
export const createDisciplina = async (nome) => {
  try {
    const response = await api.post('/disciplinas', { nome });
    return response.data; // Retorna os dados da disciplina criada
  } catch (error) {
    console.error("Erro ao criar a disciplina:", error);
    throw error;
  }
};

// Função para atualizar uma disciplina existente
export const updateDisciplina = async (id, nome) => {
  try {
    const response = await api.put(`/disciplinas/${id}`, { nome });
    return response.data; // Retorna os dados da disciplina atualizada
  } catch (error) {
    console.error("Erro ao atualizar a disciplina:", error);
    throw error;
  }
};

// Função para deletar uma disciplina
export const deleteDisciplina = async (id) => {
  try {
    const response = await api.delete(`/disciplinas/${id}`);
    return response.data; // Retorna a resposta da remoção
  } catch (error) {
    console.error("Erro ao deletar a disciplina:", error);
    throw error;
  }
};


export const associateAlunoToTurma = async (alunoId, turmaId) => {
  try {
    const response = await api.post('/alunos_turma', { id_aluno: alunoId, id_turma: turmaId });
    return response.data; 
  } catch (error) {
    console.error("Erro ao associar aluno à turma:", error);
    throw error; 
  }
};


export const getAtividades = async () => {
  try {
    const response = await api.get('/atividades');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar atividades:', error);
    throw error;
  }
};

// Função para criar uma nova atividade
export const createAtividade = async (id_disciplina, id_turma, id_professor, titulo, descricao, data_atividade, dificuldade) => {
  try {
    const response = await api.post('/atividades', id_disciplina, id_turma, id_professor, titulo, descricao, data_atividade, dificuldade);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar atividade:', error);
    throw error;
  }
};

// Função para atualizar uma atividade existente
export const updateAtividade = async (id, atividade) => {
  try {
    const response = await api.put(`/atividades/${id}`, atividade);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar atividade:', error);
    throw error;
  }
};

// Função para deletar uma atividade
export const deleteAtividade = async (id) => {
  try {
    const response = await api.delete(`/atividades/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir atividade:', error);
    throw error;
  }
};

export const getDesempenhos = async () => {
  try {
    const response = await api.get('/desempenho');
    return response.data;
  } catch (error) {
    console.error('Erro ao carregar desempenho:', error);
    throw error;
  }
};

export const createDesempenho = async (desempenhoData) => {
  try {
    const response = await api.post('/desempenho', desempenhoData);
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar desempenho:', error);
    throw error;
  }
};

export const getProfessoresDisciplinas = async () => {
  try {
    const response = await api.get('/professores_disciplina');
    return response.data;
  } catch (error) {
    console.error('Erro ao carregar professores e disciplinas:', error);
    throw error;
  }
};

export const createProfessorDisciplina = async (data) => {
  try {
    const response = await api.post('/professores_disciplina', data);
    return response.data;
  } catch (error) {
    console.error('Erro ao associar professor e disciplina:', error);
    throw error;
  }
};

export const deleteProfessorDisciplina = async (id) => {
  try {
    await api.delete(`/professores_disciplina/${id}`);
  } catch (error) {
    console.error('Erro ao excluir associação entre professor e disciplina:', error);
    throw error;
  }
};

export const getProfessoresTurmas = async () => {
  try {
    const response = await api.get('/professores_turma');
    return response.data;
  } catch (error) {
    console.error('Erro ao carregar professores e turmas:', error);
    throw error;
  }
};

// Função para associar um professor a uma turma
export const createProfessorTurma = async (data) => {
  try {
    const response = await api.post('/professores_turma', data);
    return response.data;
  } catch (error) {
    console.error('Erro ao associar professor e turma:', error);
    throw error;
  }
};

// Função para excluir a associação entre professor e turma
export const deleteProfessorTurma = async (id) => {
  try {
    await api.delete(`/professores_turma/${id}`);
  } catch (error) {
    console.error('Erro ao excluir associação entre professor e turma:', error);
    throw error;
  }
};

export const getRegistrosAtividades = async () => {
  try {
    const response = await api.get('/registros');
    return response.data;
  } catch (error) {
    console.error('Erro ao carregar registros de atividades:', error);
    throw error;
  }
};

// Função para registrar uma nova atividade
export const createRegistroAtividade = async (data) => {
  try {
    const response = await api.post('/registros', data);
    return response.data;
  } catch (error) {
    console.error('Erro ao registrar atividade:', error);
    throw error;
  }
};

// Função para excluir um registro de atividade
export const deleteRegistroAtividade = async (id) => {
  try {
    await api.delete(`/registros/${id}`);
  } catch (error) {
    console.error('Erro ao excluir registro de atividade:', error);
    throw error;
  }
};

export const getRelatorios = async () => {
  try {
    const response = await api.get('/relatorios');
    return response.data;
  } catch (error) {
    console.error('Erro ao carregar relatórios:', error);
    throw error;
  }
};

// Função para filtrar relatórios por turma e disciplina
export const getRelatoriosByTurmaDisciplina = async (turma, disciplina) => {
  try {
    const response = await api.get(`/relatorios?turma=${turma}&disciplina=${disciplina}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao gerar relatório:', error);
    throw error;
  }
};


export default api;
