import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./componentes/Header";
import DetallesPelicula from "./componentes/DetallesPelicula";
import Categorias from "./componentes/Categorias";
import PeliculaCategoria from "./componentes/PeliculaCategoria";
import MovieList from "./componentes/MovieList";
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/peliculas" />
          <Route path="/series" />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/pelicula/id/:id" element={<DetallesPelicula />} />
          <Route path="/categoria/:id" element={<PeliculaCategoria />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
