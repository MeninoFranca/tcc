

# Roteiro de Desenvolvimento de Software: Gestão Acadêmica

---

## **1. Administrador**

O **Administrador** tem controle completo sobre o sistema. Suas responsabilidades incluem a gestão de usuários, turmas, disciplinas, e o acompanhamento do desempenho dos alunos.

### **Ações Detalhadas:**

---

### **1.1 Cadastrar Usuários (Alunos, Professores, Coordenadores, Administradores)**

- **Objetivo:** Permitir o cadastro de novos usuários no sistema.
- **Como:** O Administrador acessa a interface de cadastro e preenche os campos obrigatórios (nome completo, e-mail, senha, telefone, foto, tipo de usuário).
- **Banco de Dados:** As informações são inseridas na tabela `usuarios` com os dados `nome_completo`, `email`, `senha`, `tipo_usuario`, `telefone`, `foto_url`, e `status` (Ativo/Inativo).
- **Exemplo de comando SQL:**
  ```sql
  INSERT INTO usuarios (nome_completo, email, senha, tipo_usuario, status) 
  VALUES ('João Silva', 'joao@email.com', 'senha123', 'Professor', 'Ativo');
  ```

---

### **1.2 Cadastrar Turmas**

- **Objetivo:** Criar novas turmas e definir o turno (Manhã, Tarde ou Noite).
- **Como:** O Administrador escolhe um nome para a turma e define seu turno.
- **Banco de Dados:** As informações são armazenadas na tabela `turmas`, incluindo `nome_turma` e `turno`.
- **Exemplo de comando SQL:**
  ```sql
  INSERT INTO turmas (nome_turma, turno) 
  VALUES ('Turma A', 'Manhã');
  ```

---

### **1.3 Cadastrar Disciplinas**

- **Objetivo:** Criar novas disciplinas no sistema.
- **Como:** O Administrador cria novas disciplinas com um nome específico.
- **Banco de Dados:** As informações são armazenadas na tabela `disciplinas`.
- **Exemplo de comando SQL:**
  ```sql
  INSERT INTO disciplinas (nome_disciplina) 
  VALUES ('Matemática');
  ```

---

### **1.4 Associar Alunos a Turmas**

- **Objetivo:** Associar alunos às turmas correspondentes.
- **Como:** O Administrador associa um aluno a uma turma específica.
- **Banco de Dados:** A associação é realizada na tabela `alunos_turma`.
- **Exemplo de comando SQL:**
  ```sql
  INSERT INTO alunos_turma (id_aluno, id_turma) 
  VALUES (1, 2);  -- Associa o aluno de id 1 à turma de id 2
  ```

---

### **1.5 Associar Professores a Turmas e Disciplinas**

- **Objetivo:** Associar professores a turmas e disciplinas específicas.
- **Como:** O Administrador faz a associação entre professores, turmas e disciplinas nas tabelas `professores_turma` e `professores_disciplina`.
- **Exemplo de comando SQL:**
  ```sql
  INSERT INTO professores_turma (id_professor, id_turma) 
  VALUES (3, 2);  -- Associa o professor de id 3 à turma de id 2
  ```

---

### **1.6 Gerar Relatórios de Desempenho**

- **Objetivo:** Visualizar relatórios detalhados de desempenho dos alunos.
- **Como:** O Administrador pode consultar os relatórios de desempenho com base na tabela `desempenho`.
- **Exemplo de comando SQL:**
  ```sql
  SELECT * FROM desempenho WHERE id_turma = 2 AND id_disciplina = 1;
  ```

---

### **1.7 Visualizar Desempenho dos Alunos**

- **Objetivo:** Consultar notas e feedbacks de atividades dos alunos.
- **Como:** O Administrador acessa as tabelas de `desempenho` para visualizar os dados.
- **Exemplo de comando SQL:**
  ```sql
  SELECT id_aluno, nota, feedback_professor FROM desempenho WHERE id_disciplina = 1;
  ```

---

### **1.8 Visualizar Atividades e Registros de Entregas**

- **Objetivo:** Consultar todas as atividades e registros de entregas realizadas pelos alunos.
- **Como:** O Administrador acessa as tabelas de `atividades` e `registros_atividade`.
- **Exemplo de comando SQL:**
  ```sql
  SELECT * FROM atividades WHERE id_turma = 2;
  ```

---

## **2. Professor**

O **Professor** tem acesso à criação de atividades, correção de atividades, atribuição de notas, feedbacks e acompanhamento do desempenho dos alunos.

### **Ações Detalhadas:**

---

### **2.1 Exibir Disciplinas e Turmas Associadas**

- **Objetivo:** O professor consulta as turmas e disciplinas que ele leciona.
- **Como:** O sistema filtra as turmas e disciplinas vinculadas ao professor.
- **Exemplo de comando SQL:**
  ```sql
  SELECT * FROM professores_turma WHERE id_professor = 3;  -- Exibe as turmas do professor
  ```

---

### **2.2 Criar Atividades**

- **Objetivo:** O professor cria atividades associadas às turmas e disciplinas.
- **Como:** O professor define título, descrição, data de entrega e grau de dificuldade da atividade.
- **Banco de Dados:** As atividades são registradas na tabela `atividades`.
- **Exemplo de comando SQL:**
  ```sql
  INSERT INTO atividades (id_disciplina, id_turma, id_professor, titulo, descricao, data_atividade, dificuldade)
  VALUES (1, 2, 3, 'Prova de Matemática', 'Descrição da prova', '2024-12-20', 'Difícil');
  ```

---

### **2.3 Exibir Atividades Criadas**

- **Objetivo:** O professor visualiza todas as atividades que ele criou.
- **Como:** O sistema filtra as atividades criadas pelo professor.
- **Exemplo de comando SQL:**
  ```sql
  SELECT * FROM atividades WHERE id_professor = 3;
  ```

---

### **2.4 Atribuir Notas e Feedback nas Atividades**

- **Objetivo:** O professor atribui notas e feedbacks aos alunos pelas atividades entregues.
- **Como:** O professor corrige as atividades e fornece feedbacks nas tabelas de `desempenho`.
- **Exemplo de comando SQL:**
  ```sql
  INSERT INTO desempenho (id_aluno, id_disciplina, id_atividade, nota, feedback_professor)
  VALUES (1, 1, 1, 9.0, 'Bom trabalho');
  ```

---

### **2.5 Visualizar Registros de Atividades Entregues**

- **Objetivo:** O professor visualiza as entregas feitas pelos alunos.
- **Como:** O sistema consulta os registros de entregas na tabela `registros_atividade`.
- **Exemplo de comando SQL:**
  ```sql
  SELECT * FROM registros_atividade WHERE id_atividade = 1;
  ```

---

### **2.6 Visualizar Desempenho dos Alunos nas Atividades**

- **Objetivo:** O professor visualiza o desempenho dos alunos nas atividades.
- **Como:** O desempenho é consultado na tabela `desempenho`.
- **Exemplo de comando SQL:**
  ```sql
  SELECT * FROM desempenho WHERE id_atividade = 1;
  ```

---

## **3. Aluno**

O **Aluno** tem como foco as atividades, entregas de tarefas e visualização do seu desempenho.

### **Ações Detalhadas:**

---

### **3.1 Participar de Atividades Associadas à Sua Turma**

- **Objetivo:** O aluno visualiza as atividades da sua turma.
- **Como:** O sistema filtra as atividades relacionadas à turma do aluno.
- **Exemplo de comando SQL:**
  ```sql
  SELECT * FROM atividades WHERE id_turma IN (SELECT id_turma FROM alunos_turma WHERE id_aluno = 1);
  ```

---

### **3.2 Postar (Entregar) Atividades**

- **Objetivo:** O aluno entrega suas atividades com anexos e comentários.
- **Como:** A entrega é registrada na tabela `registros_atividade`.
- **Exemplo de comando SQL:**
  ```sql
  INSERT INTO registros_atividade (id_atividade, id_aluno, grau_dificuldade, comentario_dificuldade, tempo_gasto, anexo_atividade)
  VALUES (1, 1, 'Médio', 'Achei a atividade moderada', 30, 'atividade.pdf');
  ```

---

### **3.3 Visualizar Atividades Pendentes**

- **Objetivo:** O aluno verifica as atividades que ainda precisa entregar.
- **Como:** O sistema filtra as atividades pendentes.
- **Exemplo de comando SQL:**
  ```sql
  SELECT * FROM atividades WHERE id_turma IN (SELECT id_turma FROM alunos_turma WHERE id_aluno = 1) AND id_atividade NOT IN (SELECT id_atividade FROM registros_atividade WHERE id_aluno = 1);
  ```

---

### **3.4 Visualizar Atividades Entregues**



- **Objetivo:** O aluno visualiza as atividades já entregues, com as notas e feedbacks recebidos.
- **Como:** O sistema consulta as entregas feitas na tabela `registros_atividade`.
- **Exemplo de comando SQL:**
  ```sql
  SELECT * FROM registros_atividade WHERE id_aluno = 1;
  ```

---

### **3.5 Visualizar Desempenho nas Atividades**

- **Objetivo:** O aluno consulta seu desempenho nas atividades entregues.
- **Como:** O desempenho é consultado na tabela `desempenho`.
- **Exemplo de comando SQL:**
  ```sql
  SELECT * FROM desempenho WHERE id_aluno = 1;
  ```

---

## **Estrutura do Banco de Dados**

- **Tabelas de Usuários:**
  - `usuarios`
  - `alunos_turma`
  - `atividades`
  - `desempenho`
  - `disciplinas`
  - `professores_turma`
  - `professores_disciplina`
  - `registros_atividade`
  - `turmas`

Cada uma dessas tabelas contém relacionamentos específicos e restrições de integridade referencial, que são fundamentais para o correto funcionamento da plataforma.

