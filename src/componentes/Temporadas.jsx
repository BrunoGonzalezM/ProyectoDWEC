import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchTvSeasons } from '../funciones/fetch';
import { Image, Flex, Box } from '@chakra-ui/react';






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
            <Flex p="2em" flexDirection="column">
                {detalles && detalles.seasons.map(season => (
                    <Box key={season.id} mt="4em" justifyContent="center" alignItems="center">
                        {season.name}
                        • ({season.air_date ? new Date(season.air_date).getFullYear() : ""})
                        • {season.episode_count} episodios
                        • {season.vote_average}
                        <br />
                        {season.overview}
                        <br />
                        <Image src={`${imgURL}${season.poster_path}`}></Image>
                    </Box>
                ))}
            </Flex>

        </>
    )

}