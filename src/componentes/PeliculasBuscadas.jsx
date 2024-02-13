import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Flex, Box, Button, Heading } from '@chakra-ui/react';
import { fetchBusqueda, fetchMovies } from "../funciones/fetch";
import MovieCarousel from "../componentes/MovieCarousel";

function PeliculasBuscadas() {
    const { busqueda } = useParams();
    const [moviePeli, setMoviePeli] = useState([]);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setPage(1);
    }, [busqueda]);

    useEffect(() => {
        buscarPelicula();
        sinBuscarPeli();
    }, [busqueda, page]);

    const handleNextPage = () => {
        if (page < 99) {
            setPage(page + 1);
        }
    };

    const handleBackPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const buscarPelicula = () => {
        setLoading(true);
        setError(null);
        fetchBusqueda(busqueda, page)
            .then((movies) => {
                setMoviePeli(movies);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const sinBuscarPeli = () => {
        setLoading(true);
        setError(null);
        fetchMovies(1, page) // Aquí se corrige el envío de la página a fetchMovies
            .then((movies) => {
                setMovies(movies); // Se actualiza correctamente el estado de películas sin búsqueda
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
            <Flex>
                {loading && <p>Cargando...</p>}
                {error && <p>Error: {error}</p>}
                {busqueda ? (
                    <>
                        <Flex bg="#1c1c1c" flexWrap="wrap" justifyContent="space-between">
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
                    </>
                ) : (
                    moviePeli.length === 0 ? (
                        <div>No se han encontrado películas</div>
                    ) : (
                        <Flex bg="#1c1c1c" flexWrap="wrap" justifyContent="space-between">
                            <MovieCarousel movies={movies} />
                            <Box margin="0 auto">
                                <Button mx="1em" onClick={handleBackPage} isDisabled={page <= 1}>
                                    ANTERIOR
                                </Button>
                                <Button mx="1em" onClick={handleNextPage} isDisabled={page >= 99}>
                                    SIGUIENTE
                                </Button>
                            </Box>
                        </Flex>
                    )
                )}
            </Flex>
        </>
    );
}

export default PeliculasBuscadas;
