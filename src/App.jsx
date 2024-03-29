import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from "./componentes/Header";
import DetallesPeliculaYSeries from "./componentes/DetallesPeliculaYSeries";
import Categorias from "./componentes/Categorias";
import PeliculasYSeries from "./componentes/PeliculasYSeries";
import Home from "./componentes/Home";
import Person from "./componentes/Person";

import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';

function App() {
  return (
    <>
      <ChakraProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/categorias" element={<Categorias />} />
            <Route path="/series" element={<PeliculasYSeries isMovie={false} />} />
            <Route path="/peliculas" element={<PeliculasYSeries isMovie={true} />} />

            <Route path="/serie/id/:id" element={<DetallesPeliculaYSeries isMovie={false} />} />
            <Route path="/pelicula/id/:id" element={<DetallesPeliculaYSeries isMovie={true} />} />
            <Route path="/categoria/:id" element={<PeliculasYSeries isMovie={true} />} />

            <Route path="/search/" element={<PeliculasYSeries isMovie={true} />} />
            <Route path="/search/:busqueda" element={<PeliculasYSeries isMovie={true} />} />

            <Route path="/personas/id/:id" element={<Person />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </>
  )
}

export default App;
