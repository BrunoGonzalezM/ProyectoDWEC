import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchCategoriaPelicula } from '../funciones/fetch';
import Card from './Card';

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
            .finally(()=>{
                setLoading(false)
            })

    }, []);

    return (
        <>
            {loading&& !error&& <h1>Cargando...</h1>}
            {peliPorCategoria.map((movie)=>(
                <div key={movie.id}>
                    <p>{movie.title}</p>
                    <Link to={`/pelicula/id/${movie.id}`}>
                        <Card imgUrl={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} title={movie.title}  />
                    </Link>
                </div>
            ))}
        </>
    );
}
