import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Flex, Box } from '@chakra-ui/react';
import { fetchBusqueda } from "../funciones/fetch";

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
            <Box>
                <h2>Resultados de búsqueda para: {busqueda}</h2>
                {loading && <p>Cargando...</p>}
                {error && <p>Error: {error}</p>}
                <ul>
                    {moviePeli.map(movie => (
                        <li key={movie.id}>- {movie.title}</li>
                    ))}
                </ul>
            </Box>
        </Flex>
    );
}

export default Peliculas;
