import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/login.js';
import Main from './pages/main.js';
import NotFoundPage from './pages/NotFound/notFoundPage.js';
import Cadastro from './pages/Cadastro/cadastro.js';
import Dashboard from './pages/Dashboard/dashboard.js';
import Estatisticas from './pages/Estatisticas/estatisticas.js';

function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/estatisticas" element={<Estatisticas />} />
      </Routes>
    </Router>
  );
}

export default Rotas;
