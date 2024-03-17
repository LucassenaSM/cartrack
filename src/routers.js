import Login from './components/pages/login.js';
import Cadastro from './components/pages/cadastro.js';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  );
}

export default Rotas;
