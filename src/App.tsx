import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import PaginaBaseAdmin from './paginas/Administracao/PaginaBaseAdmin';
import AdministracaoRestaurantes from './paginas/Administracao/Restaurante';
import FormularioRestaurante from './paginas/Administracao/Restaurante/FormularioRestaurante';
import FormularioPratos from './paginas/Administracao/Prato/FormularioPratos';
import AdministracaoPratos from './paginas/Administracao/Prato';


function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      
      <Route path="/admin" element={<PaginaBaseAdmin />} >

        <Route path="/admin/restaurantes" element={<AdministracaoRestaurantes />} />
        <Route path="/admin/restaurantes/novo/" element={<FormularioRestaurante />} />
        <Route path='/admin/restaurantes/:id' element={<FormularioRestaurante />} />
        
        <Route path="/admin/pratos" element={<AdministracaoPratos />} />
        <Route path="/admin/pratos/novo/" element={<FormularioPratos />} />
        <Route path='/admin/pratos/:id' element={<FormularioPratos />} />
      </Route>
    </Routes>
  );
}

export default App;
