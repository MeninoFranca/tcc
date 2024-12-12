-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 12/12/2024 às 21:14
-- Versão do servidor: 10.11.10-MariaDB
-- Versão do PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `u721539099_agendaescola`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `alunos_turma`
--

CREATE TABLE `alunos_turma` (
  `id_aluno_turma` int(11) NOT NULL,
  `id_aluno` int(11) DEFAULT NULL,
  `id_turma` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `atividades`
--

CREATE TABLE `atividades` (
  `id_atividade` int(11) NOT NULL,
  `id_disciplina` int(11) DEFAULT NULL,
  `id_turma` int(11) DEFAULT NULL,
  `id_professor` int(11) DEFAULT NULL,
  `titulo` varchar(255) NOT NULL,
  `descricao` text NOT NULL,
  `data_atividade` date NOT NULL,
  `dificuldade` enum('Fácil','Médio','Difícil') NOT NULL,
  `data_criacao` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `desempenho`
--

CREATE TABLE `desempenho` (
  `id_desempenho` int(11) NOT NULL,
  `id_aluno` int(11) DEFAULT NULL,
  `id_disciplina` int(11) DEFAULT NULL,
  `id_atividade` int(11) DEFAULT NULL,
  `nota` decimal(5,2) DEFAULT NULL,
  `feedback_professor` text DEFAULT NULL,
  `data_registro` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `disciplinas`
--

CREATE TABLE `disciplinas` (
  `id_disciplina` int(11) NOT NULL,
  `nome_disciplina` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `professores_disciplina`
--

CREATE TABLE `professores_disciplina` (
  `id_professor_disciplina` int(11) NOT NULL,
  `id_professor` int(11) DEFAULT NULL,
  `id_disciplina` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `professores_turma`
--

CREATE TABLE `professores_turma` (
  `id_professor_turma` int(11) NOT NULL,
  `id_professor` int(11) DEFAULT NULL,
  `id_turma` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `registros_atividade`
--

CREATE TABLE `registros_atividade` (
  `id_registro` int(11) NOT NULL,
  `id_atividade` int(11) DEFAULT NULL,
  `id_aluno` int(11) DEFAULT NULL,
  `id_disciplina` int(11) DEFAULT NULL,
  `grau_dificuldade` enum('Baixa','Moderada','Alta') NOT NULL,
  `comentario_dificuldade` text DEFAULT NULL,
  `tempo_gasto` int(11) DEFAULT NULL,
  `feedback_professor` text DEFAULT NULL,
  `anexo_atividade` varchar(255) DEFAULT NULL,
  `data_entrega` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `turmas`
--

CREATE TABLE `turmas` (
  `id_turma` int(11) NOT NULL,
  `nome_turma` varchar(100) NOT NULL,
  `turno` enum('Manhã','Tarde','Noite') NOT NULL,
  `data_criacao` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nome_completo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `telefone` varchar(15) DEFAULT NULL,
  `foto_url` varchar(255) DEFAULT NULL,
  `sexo` enum('Masculino','Feminino','Outro','Não informar') DEFAULT 'Não informar',
  `tipo_usuario` enum('Aluno','Professor','Coordenador','Administrador') NOT NULL DEFAULT 'Aluno',
  `status` enum('Ativo','Inativo') DEFAULT 'Ativo',
  `data_criacao` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nome_completo`, `email`, `senha`, `telefone`, `foto_url`, `sexo`, `tipo_usuario`, `status`, `data_criacao`) VALUES
(1, 'João Silva', 'joao.silva@email.com', '123456', '11987654321', 'http://exemplo.com/foto_joao.jpg', 'Masculino', 'Aluno', 'Ativo', '2024-12-12 20:38:24'),
(2, 'Maria Oliveira', 'maria.oliveira@email.com', '123456', '21976543210', 'http://exemplo.com/foto_maria.jpg', 'Feminino', 'Professor', 'Ativo', '2024-12-12 20:38:24'),
(3, 'Carlos Souza', 'carlos.souza@email.com', '123456', '31965432109', 'http://exemplo.com/foto_carlos.jpg', 'Masculino', 'Coordenador', 'Inativo', '2024-12-12 20:38:24'),
(4, 'Ana Costa', 'ana.costa@email.com', '123456', '41987654310', 'http://exemplo.com/foto_ana.jpg', 'Feminino', 'Administrador', 'Ativo', '2024-12-12 20:38:24'),
(5, 'Pedro Santos', 'pedro.santos@email.com', '123456', '11965432101', 'http://exemplo.com/foto_pedro.jpg', 'Masculino', 'Aluno', 'Inativo', '2024-12-12 20:38:24');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `alunos_turma`
--
ALTER TABLE `alunos_turma`
  ADD PRIMARY KEY (`id_aluno_turma`),
  ADD UNIQUE KEY `id_aluno` (`id_aluno`,`id_turma`),
  ADD KEY `id_turma` (`id_turma`);

--
-- Índices de tabela `atividades`
--
ALTER TABLE `atividades`
  ADD PRIMARY KEY (`id_atividade`),
  ADD KEY `id_disciplina` (`id_disciplina`),
  ADD KEY `id_turma` (`id_turma`),
  ADD KEY `id_professor` (`id_professor`);

--
-- Índices de tabela `desempenho`
--
ALTER TABLE `desempenho`
  ADD PRIMARY KEY (`id_desempenho`),
  ADD KEY `id_aluno` (`id_aluno`),
  ADD KEY `id_disciplina` (`id_disciplina`),
  ADD KEY `id_atividade` (`id_atividade`);

--
-- Índices de tabela `disciplinas`
--
ALTER TABLE `disciplinas`
  ADD PRIMARY KEY (`id_disciplina`);

--
-- Índices de tabela `professores_disciplina`
--
ALTER TABLE `professores_disciplina`
  ADD PRIMARY KEY (`id_professor_disciplina`),
  ADD UNIQUE KEY `id_professor` (`id_professor`,`id_disciplina`),
  ADD KEY `id_disciplina` (`id_disciplina`);

--
-- Índices de tabela `professores_turma`
--
ALTER TABLE `professores_turma`
  ADD PRIMARY KEY (`id_professor_turma`),
  ADD UNIQUE KEY `id_professor` (`id_professor`,`id_turma`),
  ADD KEY `id_turma` (`id_turma`);

--
-- Índices de tabela `registros_atividade`
--
ALTER TABLE `registros_atividade`
  ADD PRIMARY KEY (`id_registro`),
  ADD KEY `id_atividade` (`id_atividade`),
  ADD KEY `id_aluno` (`id_aluno`),
  ADD KEY `id_disciplina` (`id_disciplina`);

--
-- Índices de tabela `turmas`
--
ALTER TABLE `turmas`
  ADD PRIMARY KEY (`id_turma`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `alunos_turma`
--
ALTER TABLE `alunos_turma`
  MODIFY `id_aluno_turma` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `atividades`
--
ALTER TABLE `atividades`
  MODIFY `id_atividade` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `desempenho`
--
ALTER TABLE `desempenho`
  MODIFY `id_desempenho` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `disciplinas`
--
ALTER TABLE `disciplinas`
  MODIFY `id_disciplina` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `professores_disciplina`
--
ALTER TABLE `professores_disciplina`
  MODIFY `id_professor_disciplina` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `professores_turma`
--
ALTER TABLE `professores_turma`
  MODIFY `id_professor_turma` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `registros_atividade`
--
ALTER TABLE `registros_atividade`
  MODIFY `id_registro` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `turmas`
--
ALTER TABLE `turmas`
  MODIFY `id_turma` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `alunos_turma`
--
ALTER TABLE `alunos_turma`
  ADD CONSTRAINT `alunos_turma_ibfk_1` FOREIGN KEY (`id_aluno`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `alunos_turma_ibfk_2` FOREIGN KEY (`id_turma`) REFERENCES `turmas` (`id_turma`) ON DELETE CASCADE;

--
-- Restrições para tabelas `atividades`
--
ALTER TABLE `atividades`
  ADD CONSTRAINT `atividades_ibfk_1` FOREIGN KEY (`id_disciplina`) REFERENCES `disciplinas` (`id_disciplina`) ON DELETE CASCADE,
  ADD CONSTRAINT `atividades_ibfk_2` FOREIGN KEY (`id_turma`) REFERENCES `turmas` (`id_turma`) ON DELETE CASCADE,
  ADD CONSTRAINT `atividades_ibfk_3` FOREIGN KEY (`id_professor`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Restrições para tabelas `desempenho`
--
ALTER TABLE `desempenho`
  ADD CONSTRAINT `desempenho_ibfk_1` FOREIGN KEY (`id_aluno`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `desempenho_ibfk_2` FOREIGN KEY (`id_disciplina`) REFERENCES `disciplinas` (`id_disciplina`) ON DELETE CASCADE,
  ADD CONSTRAINT `desempenho_ibfk_3` FOREIGN KEY (`id_atividade`) REFERENCES `atividades` (`id_atividade`) ON DELETE CASCADE;

--
-- Restrições para tabelas `professores_disciplina`
--
ALTER TABLE `professores_disciplina`
  ADD CONSTRAINT `professores_disciplina_ibfk_1` FOREIGN KEY (`id_professor`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `professores_disciplina_ibfk_2` FOREIGN KEY (`id_disciplina`) REFERENCES `disciplinas` (`id_disciplina`) ON DELETE CASCADE;

--
-- Restrições para tabelas `professores_turma`
--
ALTER TABLE `professores_turma`
  ADD CONSTRAINT `professores_turma_ibfk_1` FOREIGN KEY (`id_professor`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `professores_turma_ibfk_2` FOREIGN KEY (`id_turma`) REFERENCES `turmas` (`id_turma`) ON DELETE CASCADE;

--
-- Restrições para tabelas `registros_atividade`
--
ALTER TABLE `registros_atividade`
  ADD CONSTRAINT `registros_atividade_ibfk_1` FOREIGN KEY (`id_atividade`) REFERENCES `atividades` (`id_atividade`) ON DELETE CASCADE,
  ADD CONSTRAINT `registros_atividade_ibfk_2` FOREIGN KEY (`id_aluno`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `registros_atividade_ibfk_3` FOREIGN KEY (`id_disciplina`) REFERENCES `disciplinas` (`id_disciplina`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
