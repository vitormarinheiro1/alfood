import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import PaginaBaseAdmin from './paginas/AdministracaoRestaurantes/PaginaBaseAdmin';
import AdministracaoRestaurantes from './paginas/AdministracaoRestaurantes';
import FormularioRestaurante from './paginas/AdministracaoRestaurantes/FormularioRestaurante';


function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin" element={<PaginaBaseAdmin />} >
        <Route path="/admin/restaurantes" element={<AdministracaoRestaurantes />} />
        <Route path="/admin/restaurantes/novo/" element={<FormularioRestaurante />} />
        <Route path='/admin/restaurantes/:id' element={<FormularioRestaurante />} />
      </Route>
    </Routes>
  );
}

export default App;
