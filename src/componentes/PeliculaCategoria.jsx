import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchCategoriaPelicula } from '../funciones/fetch';
import "../styles/stylesMovieList.css";
import { MovieCarousel } from './MovieList';

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
        <div id="movies-list">
            <div className='nolistado'>
                
                <MovieCarousel movies={peliPorCategoria} />
                <button onClick={handleBackPage} disabled={page <= 1}>ANTERIOR</button>
                <button onClick={handleNextPage} disabled={page >= 99}>SIGUIENTE</button>
            </div>
        </div>
    );

}
