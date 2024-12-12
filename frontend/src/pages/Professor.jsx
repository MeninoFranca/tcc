import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import AtividadePage from '../components/AtividadePage';
import DificuldadePage from '../components/DificuldadePage';
import EngajamentoPage from '../components/EngajamentoPage';
import EstatisticaPage from '../components/EstatisticaPage';
import NotaPage from '../components/NotaPage';


const Professor = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  if (!userId) {
    navigate('/login');
  }
  return (
    <div>
      <h1>tela professor</h1>
      <EngajamentoPage tipoUsuario="Professor" />
      <EstatisticaPage tipoUsuario="Professor" />
      <NotaPage />
      <AtividadePage tipoUsuario="Professor" />
      <DificuldadePage tipoUsuario="Professor" />
    </div>
  );
};

export default Professor;
