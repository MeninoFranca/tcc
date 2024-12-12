import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DificuldadePage from '../components/DificuldadePage';
import AnexoPage from '../components/AnexoPage';
import AtividadePage from '../components/AtividadePage'


const Aluno = () => {
  const navigate = useNavigate();

  // Usar o useEffect para navegar quando o componente for montado
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/');
    }
  }, [navigate]); // Adicionando navigate na dependência do useEffect

  const userId = localStorage.getItem('userId'); // Garantir que o userId é obtido depois da navegação, não antes.

  return (
    <div>
      <h1>tela Aluno</h1>
      {userId && (
        <>
          <AnexoPage idusario={userId} />
          <AtividadePage tipoUsuario="Aluno" />
          <DificuldadePage tipoUsuario="Aluno" idAluno={userId} /> 
        </>
      )}
    </div>
  );
};

export default Aluno;
