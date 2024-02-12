import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchCategoriaPelicula } from '../funciones/fetch';
import { MovieCarousel } from './MovieList';
import { Box, Button } from "@chakra-ui/react";

export default function PeliculaCategoria() {
    const [peliPorCategoria, setPeliPorCategoria] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        fetchCategoriaPelicula(id, page)
            .then((data) => {
                setPeliPorCategoria(data);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page]);

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
    return (
        <Box bg="blackAlpha.800" >
            <MovieCarousel movies={peliPorCategoria} />
            <Box margin="0 auto"
                display="flex"
                justifyContent="center"
            >
                <Button mx="1em" onClick={handleBackPage} isDisabled={page <= 1}>
                    ANTERIOR
                </Button>
                <Button mx="1em" onClick={handleNextPage} isDisabled={page >= 99}>
                    SIGUIENTE
                </Button>
            </Box>
        </Box>
    );

}
