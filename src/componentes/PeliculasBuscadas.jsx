import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Flex, Box ,Text,Button} from '@chakra-ui/react';
import { fetchBusqueda } from "../funciones/fetch";
import {MovieCarousel} from "./MovieList" 
function PeliculasBuscadas() {
    const { busqueda } = useParams();
    const [moviePeli, setMoviePeli] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        buscarPelicula();
    }, [busqueda,page]);
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
        fetchBusqueda(busqueda,page)
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
                <Text textColor="white">Resultados de búsqueda: {busqueda}</Text>
                {loading && <p>Cargando...</p>}
                {error && <p>Error: {error}</p>}
                <MovieCarousel  movies={moviePeli} />
            </Flex>
            
        </Flex>
        <Button onClick={handleBackPage} isDisabled={page <= 1}>
                ANTERIOR
            </Button>
            <Button onClick={handleNextPage} isDisabled={page >= 99}>
                SIGUIENTE
            </Button>
            </>
        
        ):(
            <Flex>
                Test
            </Flex>
        )}
        </>
    );
}

export default PeliculasBuscadas;
