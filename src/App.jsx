import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from "./componentes/Header";
import DetallesPelicula from "./componentes/DetallesPelicula";
import Categorias from "./componentes/Categorias";
import PeliculasYSeries from "./componentes/PeliculasYSeries";
import Home from "./componentes/Home";
import Login from "./componentes/Login";
import DetallesSeries from "./componentes/DetallesSeries";

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
            <Route path="/login" element={<Login />} />
            <Route path="/inicio" element={<Home />} />

            <Route path="/series" element={<PeliculasYSeries isMovie={false}/>} />
            <Route path="/categorias" element={<Categorias isMovie={true}/>} />
            <Route path="/peliculas" element={<PeliculasYSeries isMovie={true} />} />

            <Route path="/serie/id/:id" element={<DetallesSeries />} />
            <Route path="/pelicula/id/:id" element={<DetallesPelicula />} />
            <Route path="/categoria/:id" element={<PeliculasYSeries isMovie={true} />} />

            <Route path="/search/" element={<PeliculasYSeries isMovie={true} />} /> 
            <Route path="/search/:busqueda" element={<PeliculasYSeries isMovie={true} />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </>
  )
}

export default App;
