import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from "./componentes/Header";
import DetallesPelicula from "./componentes/DetallesPelicula";
import Categorias from "./componentes/Categorias";
import PeliculaCategoria from "./componentes/PeliculaCategoria";
import MovieList from "./componentes/MovieList";
import PeliculasBuscadas from "./componentes/PeliculasBuscadas";
import Login from "./componentes/Login";

import { ChakraProvider } from '@chakra-ui/react';
import React, { useState } from 'react';

function App() {
  const [movies, setMovies] = useState([]);
  return (
    <>
      <ChakraProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/inicio" element={<MovieList />} />
            <Route path="/" element={<Login />} />
            <Route path="/peliculas" element={<PeliculasBuscadas />} />
            <Route path="/series" />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/pelicula/id/:id" element={<DetallesPelicula />} />
            <Route path="/categoria/:id" element={<PeliculaCategoria />} />
            <Route path="/peliculas/search/" element={<PeliculasBuscadas />} />
            <Route path="/peliculas/search/:busqueda" element={<PeliculasBuscadas movies={movies} />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </>
  )
}

export default App;
