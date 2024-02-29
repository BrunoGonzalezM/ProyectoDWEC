import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Flex, Heading ,Text} from '@chakra-ui/react';
import { fetchBusqueda, fetchCategoriaPelicula, moviesPopular } from '../services/fetch.jsx';
import Carousel from '../componentes/Carousel.jsx';
import { categoriasImagenes } from "../assets/categoriasYTraduccion.js"

function PeliculasYSeries({ isMovie }) {
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
        window.scrollTo(0, 0); 
        let fetchFunction;
        if (busqueda) {
            fetchFunction = fetchBusqueda;
        } else if (id) {
            fetchFunction = fetchCategoriaPelicula;
        } else {
            fetchFunction = moviesPopular;
        }
        fetchFunction(page, (isMovie ? true : false), busqueda || id)
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

    useEffect(() => {
        setShowCarousel(!busqueda && !id);
        setPage(1); //Resetear la página cuando cambie el tipo de contenido
    }, [busqueda, id, isMovie]);

    const handleNextPage = () => {
        { page < 99 && (setPage(page + 1)) }
    };
    const handleBackPage = () => {
        { page > 1 && (setPage(page - 1)) }
    };

    return (
        <Flex direction="column" alignItems="center" bg="#1c1c1c" p="2em" color="white">
            <Heading color="white" mb="1em">{isMovie ? ("PELICULAS") : ("SERIES")}</Heading>

            {loading && <Text>Cargando...</Text>}
            {error && <Text>Error: {error}</Text>}
            {busqueda && <Heading color="white" mb="1em">Resultados de: {busqueda}</Heading>}
            {id && <Heading color="white" mb="1em">Peliculas de la categoría: {categoriasImagenes[id][0]}</Heading>}
            
            {((showCarousel || (movies && movies.length > 0))) && (
                <>
                    <Carousel items={movies}  {...(isMovie ? true : false )} />
                    <Flex justifyContent="center">
                        <Button m="1em" onClick={handleBackPage} isDisabled={page <= 1}>
                            ANTERIOR
                        </Button>
                        <Button m="1em" onClick={handleNextPage} isDisabled={page >= 99}>
                            SIGUIENTE
                        </Button>
                    </Flex>
                </>
            )}
            {(!busqueda && !id && movies.length === 0 && !loading) && <Box>No se han encontrado películas</Box>}
        </Flex>
    );
}

export default PeliculasYSeries;
