import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import PaginaDespuesDelLogin from './components/PaginaDespuesDelLogin.js'; // Importa tu componente
import Logout from './components/logout';
import Navbar from './components/navbar';
import ProtectedRoute from './components/protectedRoute';
import Inicio from './components/Inicio';
import Sismos from './components/Sismos';

import Historico from './components/historico';
import Mapa from './components/mapa';
import Consejos from './components/Consejos.js';  // Importa tu componente  

import Footer from './components/Footer';



function App() {
  return (
    <Router>
       <Navbar /> {/* Muestra la barra de navegación */}
      <Routes>
      <Route path="/" element={<Inicio />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/pagina-despues-del-login" element={<ProtectedRoute element={<PaginaDespuesDelLogin />} />} /> {/* Protege esta ruta */}
        <Route path="/Sismos" element={<ProtectedRoute element={<Sismos/>} />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/consejos" element={<Consejos />} />


      </Routes>

   


    </Router>
  );
}

export default App;