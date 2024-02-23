import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchTvSeasons } from '../funciones/fetch';
import { Image, Flex, Box, Divider, Heading, Text } from '@chakra-ui/react';

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

    const imgURLSeason = `https://image.tmdb.org/t/p/w200/`;
    const imgURLDetalles = `https://image.tmdb.org/t/p/w500/`;

    return (
        <>
            <Flex
                flexDirection="column"
                bg="#1C1C1C"
                p="1em"
            >
                <Flex
                    bg="#171717"
                    h="10em"
                    alignItems="center"
                    p="1em"
                >
                    {detalles && detalles.name && (
                        <Image
                            pl="1em"
                            src={`${imgURLDetalles}${detalles.poster_path}`}
                            h="8.5em"
                            w="5.5em"
                            ml="3em"
                        />
                    )}
                    <Box flex="1" ml="2em">
                        <Heading
                            color="#fff"
                        >
                            {detalles && detalles.name} ({detalles && detalles.first_air_date ? new Date(detalles && detalles.first_air_date).getFullYear() : ""})
                        </Heading>
                    </Box>
                </Flex>
                <Flex flexDirection="column" p="1em">
                    {detalles && detalles.seasons.map(season => (
                        <Flex
                            key={season.id}
                            alignItems="center"
                            my="1em"
                        >
                            <Image
                                src={`${imgURLSeason}${season.poster_path}`}
                                mr="2em"
                                w="100px"
                                h="150px"
                            />
                            <Box flex="1" outline="1px solid red" h="9em">
                                <Text fontSize="lg" color="#fff" mb="0.5em">
                                    {season.name} ({season.air_date ? new Date(season.air_date).getFullYear() : ""}) Episodios: {season.episode_count}
                                </Text>
                               
                                <Text color="#fff">
                                    {`La temporada ${seasonNumber} de ${detalles.name} se estrenó en ${season.air_date}`}
                                </Text>
                            </Box>
                        </Flex>
                    ))}
                </Flex>
            </Flex>
        </>
    )
}
