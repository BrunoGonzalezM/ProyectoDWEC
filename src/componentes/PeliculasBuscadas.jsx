import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Flex, Box ,Text} from '@chakra-ui/react';
import { fetchBusqueda } from "../funciones/fetch";
import {MovieCarousel} from "./MovieList" 
function PeliculasBuscadas() {
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
        <>
        {busqueda ? (
            <Flex>
            <Flex bg="#1c1c1c" flexWrap="wrap" justifyContent="space-between">
                <Text textColor="white">Resultados de búsqueda: {busqueda}</Text>
                {loading && <p>Cargando...</p>}
                {error && <p>Error: {error}</p>}
                <MovieCarousel  movies={moviePeli} />
            </Flex>
        </Flex>
        ):(
            <Flex>
                Test
            </Flex>
        )}
        </>
    );
}

export default PeliculasBuscadas;
