import Login from './components/pages/login.js';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default Rotas;
