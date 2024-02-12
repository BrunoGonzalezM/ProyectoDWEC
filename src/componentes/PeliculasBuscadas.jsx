import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Flex, Text, Box, Button, Heading } from '@chakra-ui/react';
import { fetchBusqueda } from "../funciones/fetch";
import { MovieCarousel } from "./MovieList";

function PeliculasBuscadas() {
    const { busqueda } = useParams();
    const [moviePeli, setMoviePeli] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);

    // Actualiza 1 la paginacion cuando cambie la búsqueda
    useEffect(() => {
        setPage(1);
    }, [busqueda]);

    // Actualiza cuando cambie la búsqueda o la paginacion
    useEffect(() => {
        buscarPelicula();
    }, [busqueda, page]);

    // Funcion boton siguiente
    const handleNextPage = () => {
        if (page < 99) {
            setPage(page + 1);
        }
    };
    // Funcion boton anterior
    const handleBackPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const buscarPelicula = () => {
        setLoading(true);
        setError(null);
        fetchBusqueda(busqueda, page)
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
                <>
                    <Flex>
                        <Flex bg="#1c1c1c" flexWrap="wrap" justifyContent="space-between">
                            {loading && <p>Cargando...</p>}
                            {error && <p>Error: {error}</p>}
                            <Heading color="white" m="0 auto">Resultados de: {busqueda}</Heading>
                            <MovieCarousel movies={moviePeli} />
                            <Box margin="0 auto">
                                <Button mx="1em" onClick={handleBackPage} isDisabled={page <= 1}>
                                    ANTERIOR
                                </Button>
                                <Button mx="1em" onClick={handleNextPage} isDisabled={page >= 99}>
                                    SIGUIENTE
                                </Button>
                            </Box>
                        </Flex>
                    </Flex>
                </>
            ) : (
                <Flex>
                    Test
                </Flex>
            )}
        </>
    );
}

export default PeliculasBuscadas;
