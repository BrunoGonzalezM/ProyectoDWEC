import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {fetchMovieTrailers} from '../funciones/fetch';
import "../styles/stylesDetallesPelicula.css"

export default function DetallesPelicula() {
    const [trailersData, setTrailers] = useState([]);
    const [error, setError] = useState(null);

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

    return (
        <>
            <div id="movies-list">
                {error ? (
                    <p>{error}</p>
                ) : (
                    <div>
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
