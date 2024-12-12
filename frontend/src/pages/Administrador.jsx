import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UsuarioPage from '../components/UsuarioPage';
import TurmaPage from '../components/TurmaPage';
import EstatisticaPage from '../components/EstatisticaPage';
import EngajamentoPage from '../components/EngajamentoPage';
import AlunoTurmaPage from '../components/AlunoTurmaPage'
import ProfessorPage from '../components/ProfessorPage';


const Administrador = () => {
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');
  if (!userId) {
    navigate('/login');
  }

  return (
    <div>
      <h1>tela Administrador</h1>
      
      <UsuarioPage />
      <TurmaPage />
      <AlunoTurmaPage />
      <ProfessorPage />
      <EngajamentoPage tipoUsuario="Administrador" />
      <EstatisticaPage tipoUsuario="Administrador" />
    </div>
  );
};

export default Administrador;
