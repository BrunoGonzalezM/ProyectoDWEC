import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchTvSeasons } from '../funciones/fetch';
import {Image} from '@chakra-ui/react';






export default function Temporadas() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [seasons, setSeasons] = useState(null);
    const [detalles, setDetalles] = useState(null);
    const { id } = useParams();
    const { seasonNumber } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [seasons, detalles] = await Promise.all([
                    fetchTvSeasons(id, seasonNumber),
                    fetchMovieDetails(id, false)
                ]);
                setSeasons(seasons);
                setDetalles(detalles);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const imgURL = `https://image.tmdb.org/t/p/w200/`;


    return (

        <>
        
        {detalles && detalles.seasons.map(season => (
            <div key={season.id}>
                {season.name} 
                <br/>
                {season.overview}
                <br/>
                <Image src={`${imgURL}${season.poster_path}`}></Image>
            </div>
        ))}
        </>
    )

}