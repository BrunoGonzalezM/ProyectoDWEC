import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieTrailers, fetchMovieDetails, fetchCreditos } from '../funciones/fetch';
import "../styles/stylesDetallesPelicula.css";

export default function DetallesPelicula() {
    const [trailersData, setTrailers] = useState(null);
    const [error, setError] = useState(null);
    const [detalles, setDetalles] = useState(null); 
    const [creditos, setCreditos] = useState({ cast: [] }); 
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

        const fetchDataDetails = async () => {
            try {
                const detalles = await fetchMovieDetails(id);
                setDetalles(detalles);
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchDataCredits = async () => {
            try {
                const creditos = await fetchCreditos(id);
                setCreditos(creditos);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        fetchDataDetails();
        fetchDataCredits();
    }, [id]); 

    const imgURL = `https://image.tmdb.org/t/p/w400/`;

    return (
        <>
            <div id="detallesPelicula">
                {detalles && detalles.title && (
                    <>
                        <div className='detallesBody'>
                            <div className='detalles'>
                                {detalles.poster_path && <img src={`${imgURL}${detalles.poster_path}`} />}
                                <h1>{detalles.title}</h1>
                                <h2>{detalles.tagline}</h2>
                                <p>{detalles.overview}</p>
                                <div className="categorias">
                                    {detalles.genres.map((genre) => (
                                        <div key={genre.id}><p>{genre.name}</p></div>
                                    ))}
                                </div>
                                {trailersData && trailersData.key && (
                                    <a href={`https://www.youtube.com/watch?v=${trailersData.key}`} target='_blank'>
                                        <div className="botonTrailer">VER TRAILER</div>
                                    </a>
                                )}
                            </div>
                            <div className='creditosBody'>
                                <h3>Creditos:</h3><br />
                                <div className='creditosCards'>
                                    {creditos && creditos.cast && creditos.cast.filter(actor => actor.profile_path).slice(0, 5).map((actor) => (
                                        <div key={actor.id}>
                                            <p>{actor.name}</p> <br />
                                            {actor.profile_path && <img src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} alt={actor.name} />}
                                            <strong>Personaje:</strong> <p>{actor.character}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>


                    </>
                )}
            </div>
        </>
    );
}
