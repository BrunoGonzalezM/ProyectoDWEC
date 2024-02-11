import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Flex, Box } from '@chakra-ui/react';
import { fetchBusqueda } from "../funciones/fetch";
import Tarjeta from "./Tarjeta";
import {MovieCarousel} from "../componentes/MovieList" 
function Peliculas() {
    const { busqueda } = useParams();
    const [moviePeli, setMoviePeli] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        buscarPelicula();
    }, [busqueda]);

    const buscarPelicula = () => {
        setLoading(true);
        setError(null);
        fetchBusqueda(busqueda)
            .then((moviePeli) => {
                setMoviePeli(moviePeli);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Flex>
            <Flex bg="#1c1c1c" flexWrap="wrap" justifyContent="space-between">
                <h2>Resultados de búsqueda: {busqueda}</h2>
                {loading && <p>Cargando...</p>}
                {error && <p>Error: {error}</p>}
                <MovieCarousel  movies={moviePeli} />
            </Flex>
        </Flex>
    );
}

export default Peliculas;
