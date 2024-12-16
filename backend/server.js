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

// POST: Criar usuário (Aluno, Professor, Coordenador)
app.post('/usuarios', (req, res) => {
  const { nome_completo, email, senha, telefone, foto_url, tipo_usuario } = req.body;

  if (!['Aluno', 'Professor', 'Coordenador'].includes(tipo_usuario)) {
    return res.status(400).json({ error: 'Tipo de usuário inválido' });
  }

  db.query(
    'INSERT INTO usuarios (nome_completo, email, senha, telefone, foto_url, tipo_usuario) VALUES (?, ?, ?, ?, ?, ?)',
    [nome_completo, email, senha, telefone, foto_url, tipo_usuario],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Usuário criado com sucesso', id: result.insertId });
    }
  );
});

app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get('/alunos', (req, res) => {
  db.query("SELECT * FROM usuarios WHERE tipo_usuario = 'Aluno'", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get('/professor', (req, res) => {
  db.query("SELECT * FROM usuarios WHERE tipo_usuario = 'Professor'", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nome_completo, email, senha, telefone, foto_url, tipo_usuario } = req.body;

  db.query(
    'UPDATE usuarios SET nome_completo = ?, email = ?, senha = ?, telefone = ?, foto_url = ?, tipo_usuario = ? WHERE id_usuario = ?',
    [nome_completo, email, senha, telefone, foto_url, tipo_usuario, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.json({ message: 'Usuário atualizado com sucesso!' });
    }
  );
});

app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM usuarios WHERE id_usuario = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json({ message: 'Usuário deletado com sucesso!' });
  });
});


// POST: Criar Turma
app.post('/turmas', (req, res) => {
  const { nome_turma, turno } = req.body;

  if (!['Manhã', 'Tarde', 'Noite'].includes(turno)) {
    return res.status(400).json({ error: 'Turno inválido' });
  }

  db.query(
    'INSERT INTO turmas (nome_turma, turno) VALUES (?, ?)',
    [nome_turma, turno],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Turma criada com sucesso', id: result.insertId });
    }
  );
});
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
  db.query('SELECT * FROM turmas WHERE id_turma = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});
app.put('/turmas/:id', (req, res) => {
  const { id } = req.params;
  const { nome_turma, turno } = req.body;

  db.query(
    'UPDATE turmas SET nome_turma = ?, turno = ? WHERE id_turma = ?',
    [nome_turma, turno, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Turma não encontrada' });
      }
      res.json({ message: 'Turma atualizada com sucesso!' });
    }
  );
});
app.delete('/turmas/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM turmas WHERE id_turma = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Turma não encontrada' });
    }
    res.json({ message: 'Turma deletada com sucesso!' });
  });
});


// POST: Criar Disciplina
app.post('/disciplinas', (req, res) => {
  const { nome_disciplina } = req.body;

  db.query(
    'INSERT INTO disciplinas (nome_disciplina) VALUES (?)',
    [nome_disciplina],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Disciplina criada com sucesso', id: result.insertId });
    }
  );
});
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
app.put('/disciplinas/:id', (req, res) => {
  const { id } = req.params;
  const { nome_disciplina } = req.body;

  db.query(
    'UPDATE disciplinas SET nome_disciplina = ? WHERE id_disciplina = ?',
    [nome_disciplina, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Disciplina não encontrada' });
      }
      res.json({ message: 'Disciplina atualizada com sucesso!' });
    }
  );
});
app.delete('/disciplinas/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM disciplinas WHERE id_disciplina = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Disciplina não encontrada' });
    }
    res.json({ message: 'Disciplina deletada com sucesso!' });
  });
});


// POST: Associar Professor a Turma
app.post('/professor-turma', (req, res) => {
  const { id_professor, id_turma } = req.body;

  db.query(
    'SELECT * FROM professores_turma WHERE id_professor = ? AND id_turma = ?',
    [id_professor, id_turma],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: 'Professor já associado a essa turma' });
      }

      db.query(
        'INSERT INTO professores_turma (id_professor, id_turma) VALUES (?, ?)',
        [id_professor, id_turma],
        (err, result) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.status(201).json({ message: 'Professor associado à turma com sucesso', id: result.insertId });
        }
      );
    }
  );
});
app.get('/professores-turma/:id_turma', (req, res) => {
  const { id_turma } = req.params;
  db.query('SELECT * FROM professores_turma WHERE id_turma = ?', [id_turma], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});
app.put('/professor-turma/:id', (req, res) => {
  const { id } = req.params;
  const { id_professor, id_turma } = req.body;

  db.query(
    'UPDATE professores_turma SET id_professor = ?, id_turma = ? WHERE id_professor_turma = ?',
    [id_professor, id_turma, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Associação não encontrada' });
      }
      res.json({ message: 'Associação de professor e turma atualizada com sucesso!' });
    }
  );
});

app.delete('/professor-turma', (req, res) => {
  const { id_professor, id_turma } = req.body;

  db.query(
    'DELETE FROM professores_turma WHERE id_professor = ? AND id_turma = ?',
    [id_professor, id_turma],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Associação não encontrada' });
      }
      res.json({ message: 'Associação professor-turma deletada com sucesso!' });
    }
  );
});


// POST: Associar Professor a Disciplina
app.post('/professor-disciplina', (req, res) => {
  const { id_professor, id_disciplina } = req.body;

  db.query(
    'SELECT * FROM professores_disciplina WHERE id_professor = ? AND id_disciplina = ?',
    [id_professor, id_disciplina],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: 'Professor já associado a essa disciplina' });
      }

      db.query(
        'INSERT INTO professores_disciplina (id_professor, id_disciplina) VALUES (?, ?)',
        [id_professor, id_disciplina],
        (err, result) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.status(201).json({ message: 'Professor associado à disciplina com sucesso', id: result.insertId });
        }
      );
    }
  );
});
app.get('/professores-disciplina/:id_disciplina', (req, res) => {
  const { id_disciplina } = req.params;
  db.query('SELECT * FROM professores_disciplina WHERE id_disciplina = ?', [id_disciplina], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});
app.put('/professor-disciplina/:id', (req, res) => {
  const { id } = req.params;
  const { id_professor, id_disciplina } = req.body;

  db.query(
    'UPDATE professores_disciplina SET id_professor = ?, id_disciplina = ? WHERE id_professor_disciplina = ?',
    [id_professor, id_disciplina, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Associação não encontrada' });
      }
      res.json({ message: 'Associação de professor e disciplina atualizada com sucesso!' });
    }
  );
});
app.delete('/professor-disciplina', (req, res) => {
  const { id_professor, id_disciplina } = req.body;

  db.query(
    'DELETE FROM professores_disciplina WHERE id_professor = ? AND id_disciplina = ?',
    [id_professor, id_disciplina],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Associação não encontrada' });
      }
      res.json({ message: 'Associação professor-disciplina deletada com sucesso!' });
    }
  );
});


// POST: Associar Aluno a Turma
app.post('/aluno-turma', (req, res) => {
  const { id_aluno, id_turma } = req.body;

  db.query(
    'SELECT * FROM alunos_turma WHERE id_aluno = ? AND id_turma = ?',
    [id_aluno, id_turma],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: 'Aluno já associado a essa turma' });
      }

      db.query(
        'INSERT INTO alunos_turma (id_aluno, id_turma) VALUES (?, ?)',
        [id_aluno, id_turma],
        (err, result) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.status(201).json({ message: 'Aluno associado à turma com sucesso', id: result.insertId });
        }
      );
    }
  );
});
app.get('/alunos-turma/:id_turma', (req, res) => {
  const { id_turma } = req.params;
  db.query('SELECT * FROM alunos_turma WHERE id_turma = ?', [id_turma], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});
app.get('/alunos/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM alunos_turma WHERE id_aluno = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});
app.delete('/aluno-turma', (req, res) => {
  const { id_aluno, id_turma } = req.body;

  db.query(
    'DELETE FROM alunos_turma WHERE id_aluno = ? AND id_turma = ?',
    [id_aluno, id_turma],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Associação não encontrada' });
      }
      res.json({ message: 'Associação aluno-turma deletada com sucesso!' });
    }
  );
});


// POST: Criar Atividade
app.post('/atividades', (req, res) => {
  const { id_disciplina, id_turma, id_professor, titulo, descricao, data_atividade, dificuldade } = req.body;

  db.query(
    'INSERT INTO atividades (id_disciplina, id_turma, id_professor, titulo, descricao, data_atividade, dificuldade) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [id_disciplina, id_turma, id_professor, titulo, descricao, data_atividade, dificuldade],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Atividade criada com sucesso', id: result.insertId });
    }
  );
});
app.get('/atividades', (req, res) => {
  db.query('SELECT * FROM atividades', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});
app.get('/atividades/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM atividades WHERE id_atividade = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});
app.put('/atividades/:id', (req, res) => {
  const { id } = req.params;
  const { id_disciplina, id_turma, id_professor, titulo, descricao, grau_dificuldade } = req.body;

  db.query(
    'UPDATE atividades SET id_disciplina = ?, id_turma = ?, id_professor = ?, titulo = ?, descricao = ?, grau_dificuldade = ? WHERE id_atividade = ?',
    [id_disciplina, id_turma, id_professor, titulo, descricao, grau_dificuldade, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Atividade não encontrada' });
      }
      res.json({ message: 'Atividade atualizada com sucesso!' });
    }
  );
});
app.delete('/atividades/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM atividades WHERE id_atividade = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Atividade não encontrada' });
    }
    res.json({ message: 'Atividade deletada com sucesso!' });
  });
});


// POST: Entregar Atividade (Aluno)
app.post('/entregar-atividade', (req, res) => {
  const { id_atividade, id_aluno, grau_dificuldade, comentario_dificuldade, tempo_gasto, anexo_atividade } = req.body;

  db.query(
    'INSERT INTO registros_atividade (id_atividade, id_aluno, grau_dificuldade, comentario_dificuldade, tempo_gasto, anexo_atividade) VALUES (?, ?, ?, ?, ?, ?)',
    [id_atividade, id_aluno, grau_dificuldade, comentario_dificuldade, tempo_gasto, anexo_atividade],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Atividade entregue com sucesso', id: result.insertId });
    }
  );
});
app.get('/registros-atividade', (req, res) => {
  db.query('SELECT * FROM registros_atividade', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});
app.put('/entregar-atividade/:id', (req, res) => {
  const { id } = req.params;
  const { grau_dificuldade, comentario_dificuldade, tempo_gasto, anexo_atividade } = req.body;

  db.query(
    'UPDATE registros_atividade SET grau_dificuldade = ?, comentario_dificuldade = ?, tempo_gasto = ?, anexo_atividade = ? WHERE id_registro_atividade = ?',
    [grau_dificuldade, comentario_dificuldade, tempo_gasto, anexo_atividade, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Entrega de atividade não encontrada' });
      }
      res.json({ message: 'Entrega de atividade atualizada com sucesso!' });
    }
  );
});
app.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  const query = `
    SELECT id_usuario, tipo_usuario
    FROM Usuarios
    WHERE (email = ? OR nome_completo = ?)
    AND senha = ?;
  `;
  db.execute(query, [usuario, usuario, senha], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao realizar o login. Tente novamente.' });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: 'Usuário não encontrado ou senha incorreta!' });
    }

    const user = results[0]; 

    return res.status(200).json({
      message: 'Autenticação bem-sucedida!',
      id: user.id_usuario,
      tipo_usuario: user.tipo_usuario.toLowerCase(), 
    });
  });
});

app.listen(5005, () => {
  console.log('Servidor rodando na porta 5005');
});
