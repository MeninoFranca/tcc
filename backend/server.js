const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyParser.json()); 

const db = mysql.createConnection({
  host: 'localhost',              
  user: 'root',                   
  password: '',                   
  database: 'tccdois',      
  port: 3306                      
});

db.connect((err) => {
  if (err) {
    console.error('Erro de conexão com o banco de dados: ', err);
    setTimeout(() => db.connect(), 5000); 
  } else {
    console.log('Conectado ao banco de dados!');
  }
});

app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});


app.get('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.post('/usuarios', (req, res) => {
  const { nome_completo, email, senha, telefone, foto_url, sexo, tipo_usuario, status } = req.body;

  const query = `INSERT INTO usuarios (nome_completo, email, senha, telefone, foto_url, sexo, tipo_usuario, status)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [nome_completo, email, senha, telefone, foto_url, sexo, tipo_usuario, status], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id_usuario: result.insertId });
  });
});


app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;
  db.query('UPDATE usuarios SET nome = ?, email = ? WHERE id = ?', [nome, email, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Usuário atualizado com sucesso' });
  });
});

app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Usuário deletado com sucesso' });
  });
});

// Rotas de Turmas
app.get('/turmas', (req, res) => {
  db.query('SELECT * FROM turmas', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get('/turmas/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM turmas WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.post('/turmas', (req, res) => {
  const { nome, turno } = req.body;
  db.query('INSERT INTO turmas (nome, turno) VALUES (?, ?)', [nome, turno], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, nome, turno });
  });
});

app.put('/turmas/:id', (req, res) => {
  const { id } = req.params;
  const { nome, turno } = req.body;
  db.query('UPDATE turmas SET nome = ?, turno = ? WHERE id = ?', [nome, turno, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Turma atualizada com sucesso' });
  });
});

app.delete('/turmas/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM turmas WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Turma deletada com sucesso' });
  });
});

// Rotas de Disciplinas
app.get('/disciplinas', (req, res) => {
  db.query('SELECT * FROM disciplinas', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get('/disciplinas/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM disciplinas WHERE id_disciplina = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.post('/disciplinas', (req, res) => {
  const { nome_disciplina } = req.body;
  db.query('INSERT INTO disciplinas (nome_disciplina) VALUES (?)', [nome_disciplina], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id_disciplina: results.insertId });
  });
});

app.put('/disciplinas/:id', (req, res) => {
  const { id } = req.params;
  const { nome_disciplina } = req.body;
  db.query('UPDATE disciplinas SET nome_disciplina = ? WHERE id_disciplina = ?', [nome_disciplina, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Disciplina atualizada com sucesso' });
  });
});

app.delete('/disciplinas/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM disciplinas WHERE id_disciplina = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Disciplina deletada com sucesso' });
  });
});

// Associar professores às disciplinas
app.post('/professores/disciplinas', (req, res) => {
  const { id_professor, id_disciplina } = req.body;
  db.query('INSERT INTO professores_disciplina (id_professor, id_disciplina) VALUES (?, ?)', [id_professor, id_disciplina], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id_professor_disciplina: result.insertId });
  });
});

// Associar professores às turmas
app.post('/professores/turmas', (req, res) => {
  const { id_professor, id_turma } = req.body;
  db.query('INSERT INTO professores_turma (id_professor, id_turma) VALUES (?, ?)', [id_professor, id_turma], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id_professor_turma: result.insertId });
  });
});

// Associar alunos às turmas
app.post('/alunos/turmas', (req, res) => {
  const { id_aluno, id_turma } = req.body;
  db.query('INSERT INTO alunos_turma (id_aluno, id_turma) VALUES (?, ?)', [id_aluno, id_turma], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id_aluno_turma: result.insertId });
  });
});

// Rota para criar atividades
app.post('/atividades', (req, res) => {
  const { id_disciplina, id_turma, id_professor, titulo, descricao, data_atividade, dificuldade } = req.body;
  const query = `INSERT INTO atividades (id_disciplina, id_turma, id_professor, titulo, descricao, data_atividade, dificuldade)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [id_disciplina, id_turma, id_professor, titulo, descricao, data_atividade, dificuldade], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id_atividade: result.insertId });
  });
});

// Rota para registrar atividades feitas pelos alunos
app.post('/registros-atividade', (req, res) => {
  const { id_atividade, id_aluno, id_disciplina, grau_dificuldade, comentario_dificuldade, tempo_gasto, feedback_professor, anexo_atividade } = req.body;

  const query = `INSERT INTO registros_atividade (id_atividade, id_aluno, id_disciplina, grau_dificuldade, comentario_dificuldade, tempo_gasto, feedback_professor, anexo_atividade)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [id_atividade, id_aluno, id_disciplina, grau_dificuldade, comentario_dificuldade, tempo_gasto, feedback_professor, anexo_atividade], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id_registro: result.insertId });
  });
});

// Rota para buscar desempenho de alunos
app.get('/desempenho/:id_aluno/:id_disciplina', (req, res) => {
  const { id_aluno, id_disciplina } = req.params;

  const query = `
    SELECT d.nota, d.feedback_professor, a.titulo AS atividade_titulo
    FROM desempenho d
    JOIN atividades a ON d.id_atividade = a.id_atividade
    WHERE d.id_aluno = ? AND d.id_disciplina = ?
  `;

  db.query(query, [id_aluno, id_disciplina], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  console.log('Email:', email);
  console.log('Senha:', senha); // Certifique-se de que os dados estão sendo recebidos corretamente.

  const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';

  db.query(query, [email, senha], (err, results) => { 
    if (err) {
      console.error('Erro ao consultar o banco de dados:', err);
      return res.status(500).json({ success: false, message: 'Erro interno no servidor' });
    }

    console.log('Resultados da consulta:', results); // Verifique os resultados da consulta.

    if (results.length > 0) {
      const usuario = results[0];
      res.json({
        success: true,
        id_usuario: usuario.id_usuario,
        tipo_usuario: usuario.tipo_usuario,
        nome_completo: usuario.nome_completo
      });
    } else {
      res.status(400).json({ success: false, message: 'Credenciais inválidas' });
    }
  });
});




app.listen(5005, () => {
  console.log('Servidor rodando na porta 5005');
});
