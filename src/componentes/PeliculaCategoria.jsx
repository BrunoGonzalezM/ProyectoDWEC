import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchCategoriaPelicula } from '../funciones/fetch';
import "../styles/stylesMovieList.css";

import { MovieCarousel } from './MovieList';
export default function PeliculaCategoria() {
    const [peliPorCategoria, setPeliPorCategoria] = useState([]);
    const [error, setError] = useState(null);

    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategoriaPelicula(id)
            .then((data) => {
                setPeliPorCategoria(data);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false)
            })

    }, []);

    return (
        <div id="movies-list">
            <div className='nolistado'>
                <MovieCarousel movies={peliPorCategoria} />
            </div>
        </div>
    );
}
