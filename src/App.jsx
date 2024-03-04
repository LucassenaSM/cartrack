
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/pages/login.js';

function App() {
  return (
        <Router>
            <Routes>
              <Route path='/login' element={<Login />}/>
            </Routes>
        </Router>
  )
}

export default App;