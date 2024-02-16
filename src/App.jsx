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
            <Route path="/series" element={<Peliculas isMovie={false}/>} />
            <Route path="/categorias" element={<Categorias isMovie={true}/>} />
            <Route path="/serie/id/:id" element={<DetallesSeries />} />
            <Route path="/pelicula/id/:id" element={<DetallesPelicula />} />
            <Route path="/peliculas" element={<Peliculas isMovie={true} />} />
            <Route path="/categoria/:id" element={<Peliculas isMovie={true} />} />
            <Route path="/search/" element={<Peliculas isMovie={true} />} /> 
            <Route path="/search/:busqueda" element={<Peliculas isMovie={true} />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </>
  )
}

export default App;
