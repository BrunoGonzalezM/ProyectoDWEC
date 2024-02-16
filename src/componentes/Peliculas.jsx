import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { fetchBusqueda, fetchCategoriaPelicula, moviesPopular } from '../funciones/fetch';
import ImprimirPeliculas from './MovieCarousel';
import { categoriasImagenes } from "../assets/categorias.js"

function Peliculas({ isMovie }) {
    const { busqueda, id } = useParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [showCarousel, setShowCarousel] = useState(false);

    useEffect(() => {
        setPage(1);
    }, [busqueda, id]);

    useEffect(() => {
        setLoading(true);
        setError(null);
        let fetchFunction;
        if (busqueda) {
            fetchFunction = fetchBusqueda;
        } else if (id) {
            fetchFunction = fetchCategoriaPelicula;
        } else {
            fetchFunction = moviesPopular;
        }
        fetchFunction(page, busqueda || id , (isMovie ? true : false))
            .then((data) => {
                setMovies(data);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [busqueda, id, page, isMovie]);

    const handleNextPage = () => {
        { page < 99 && (setPage(page + 1)) }
    };
    const handleBackPage = () => {
        { page > 1 && (setPage(page - 1)) }
    };

    useEffect(() => {
        setShowCarousel(!busqueda && !id);
    }, [busqueda, id]);

    return (
        <Flex direction="column" alignItems="center" bg="#1c1c1c" p="2em" color="white">
            {loading && <p>Cargando...</p>}
            {error && <p>Error: {error}</p>}
            {busqueda && <Heading color="white" mb="1em">Resultados de: {busqueda}</Heading>}
            {id && <Heading color="white" mb="1em">Peliculas de la categoría: {categoriasImagenes[id][0]}</Heading>}
            {((showCarousel || (movies && movies.length > 0))) && (
                <>
                    <ImprimirPeliculas movies={movies} />
                    <Flex justifyContent="center">
                        <Button mx="1em" onClick={handleBackPage} isDisabled={page <= 1}>
                            ANTERIOR
                        </Button>
                        <Button mx="1em" onClick={handleNextPage} isDisabled={page >= 99}>
                            SIGUIENTE
                        </Button>
                    </Flex>
                </>
            )}
            {(!busqueda && !id && movies.length === 0) && <Box>No se han encontrado películas</Box>}
        </Flex>
    );
}

export default Peliculas;
