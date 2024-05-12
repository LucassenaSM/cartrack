import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login.js';
import Main from './pages/main.js';
import NotFoundPage from './pages/notFoundPage.js';
import Cadastro from './pages/cadastro.js';
import Dashboard from './pages/dashboard.js';

function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default Rotas;
