import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from "./componentes/Header";
import DetallesPelicula from "./componentes/DetallesPelicula";
import Categorias from "./componentes/Categorias";
import Peliculas from "./componentes/Peliculas";
import ImprimirPeliculas from "./componentes/ImprimirPeliculas";
import Login from "./componentes/Login";

import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';

function App() {
  return (
    <>
      <ChakraProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/inicio" element={<ImprimirPeliculas />} />
            <Route path="/series" element={<Peliculas />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/pelicula/id/:id" element={<DetallesPelicula />} />
            <Route path="/peliculas" element={<Peliculas isMovie={1} />} />
            <Route path="/categoria/:id" element={<Peliculas isMovie={1} />} />
            <Route path="/search/" element={<Peliculas isMovie={1} />} /> 
            <Route path="/search/:busqueda" element={<Peliculas isMovie={1} />} />
            <Route path="/peliculas/search/:busqueda" element={<Peliculas isMovie={1} />} /> 
          </Routes>
        </Router>
      </ChakraProvider>
    </>
  )
}

export default App;
