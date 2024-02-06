import "./App.css"
import Container from "./componentes/Container"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./componentes/Header";
import DetallesPelicula from "./componentes/detallesPelicula";
import Categorias from "./componentes/Categorias";
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Container />} />
          <Route path="/peliculas" />
          <Route path="/series"  />
          <Route path="/categorias"  element={<Categorias />} />
          <Route path="/pelicula/:id" element={<DetallesPelicula />} />
          <Route path="/pelicula/:categoria"  />
        </Routes>
      </Router>
    </>
  )
}

export default App
