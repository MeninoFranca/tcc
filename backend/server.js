const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(bodyParser.json()); 


const db = mysql.createConnection({
  host: '193.203.175.84',
  user: 'u721539099_user',
  password: 'L7OWWJ@9m',
  database: 'u721539099_agendaescola',
});

db.connect((err) => {
  if (err) {
    console.error('Erro de conexão com o banco de dados: ', err);
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
  const { nome, email } = req.body;
  db.query('INSERT INTO usuarios (nome, email) VALUES (?, ?)', [nome, email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, nome, email });
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
  db.query('SELECT * FROM disciplinas WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.post('/disciplinas', (req, res) => {
  const { nome } = req.body;
  db.query('INSERT INTO disciplinas (nome) VALUES (?)', [nome], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, nome });
  });
});

app.put('/disciplinas/:id', (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  db.query('UPDATE disciplinas SET nome = ? WHERE id = ?', [nome, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Disciplina atualizada com sucesso' });
  });
});

app.delete('/disciplinas/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM disciplinas WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Disciplina deletada com sucesso' });
  });
});

// Rotas de Atividades
app.get('/atividades', (req, res) => {
  db.query('SELECT * FROM atividades', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.post('/atividades', (req, res) => {
  const { nome, data_inicio, data_fim, id_disciplina } = req.body;
  db.query('INSERT INTO atividades (nome, data_inicio, data_fim, id_disciplina) VALUES (?, ?, ?, ?)', 
    [nome, data_inicio, data_fim, id_disciplina], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, nome, data_inicio, data_fim, id_disciplina });
  });
});

// Rotas de Desempenhos
app.get('/desempenhos', (req, res) => {
  db.query('SELECT * FROM desempenhos', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.post('/desempenhos', (req, res) => {
  const { id_usuario, id_atividade, nota } = req.body;
  db.query('INSERT INTO desempenhos (id_usuario, id_atividade, nota) VALUES (?, ?, ?)', 
    [id_usuario, id_atividade, nota], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, id_usuario, id_atividade, nota });
  });
});

const PORT = 5005;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
