import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Aluno from "./pages/Aluno";
import Professor from "./pages/Professor";
import Administrador from "./pages/Administrador";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <div>
        <h1>Agenda Escolar</h1>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/aluno" element={<Aluno />} />
          <Route path="/professor" element={<Professor />} />
          <Route path="/coordenador" element={<Administrador />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
