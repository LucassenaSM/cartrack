import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/pages/login.js';
import Main from './components/pages/main.js';
import NotFoundPage from './components/pages/notFoundPage.js';
import Cadastro from './components/pages/cadastro.js';

function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  );
}

export default Rotas;
