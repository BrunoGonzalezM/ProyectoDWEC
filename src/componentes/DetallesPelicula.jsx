import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {fetchMovieTrailers , fetchMovieDetails} from '../funciones/fetch';
import "../styles/stylesDetallesPelicula.css"

export default function DetallesPelicula() {
    const [trailersData, setTrailers] = useState([]);
    const [error, setError] = useState(null);
    const [detalles, setDetalles] = useState([]);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const trailersData = await fetchMovieTrailers(id);
                setTrailers(trailersData);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchData();
    }, []);
    
    useEffect(() => {
        fetchMovieDetails(id)
            .then((detalles) => {
                setDetalles(detalles);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(()=>{
                setLoading(false)
            })
    }, []);
    const imgURL = `https://image.tmdb.org/t/p/w200`;
    return (
        <>
            <div id="detallesPelicula">
                {error ? (
                    <p>{error}</p>
                ) : (
                    <div>
                        {detalles.title}
                        <img src={`${imgURL}${detalles.poster_path}`} />
                        <a href={`https://www.youtube.com/watch?v=${trailersData.key}`} target='blank_'>
                            <div className="botonTrailer">
                                VER TRAILER
                            </div>
                        </a>
                    </div>
                )}
            </div>
        </>
    );
}
