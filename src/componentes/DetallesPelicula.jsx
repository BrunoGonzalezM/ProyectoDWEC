import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieTrailers, fetchMovieDetails, fetchCreditos } from '../funciones/fetch';
import "../styles/stylesDetallesPelicula.css";
import { Tag, TagLabel, Box, Button, Heading, Text, Flex, Image } from "@chakra-ui/react";
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

    const imgURL = `https://image.tmdb.org/t/p/original/`;

    return (
        <>
            <Flex
                id="detallesPelicula"
                bg="#222222"
                color="white"
            >
                {detalles && detalles.title && (
                    <>
                        <Box>
                            <Flex
                                flexDirection="column"
                                justifyContent="center"
                                alignContent="center"
                                m={5}
                                textAlign="center"
                            >
                                {detalles.poster_path && <Image maxW="25%" src={`${imgURL}${detalles.poster_path}`} />}
                                <Heading>{detalles.title}</Heading>
                                <Text fontSize="2xl" > {detalles.tagline}</Text>
                                <Flex justifyContent="center">
                                    <Text fontSize="1xl" maxW={900} > {detalles.overview}</Text>
                                </Flex>
                                <Box m={2}>
                                    {detalles.genres.map((genre) => (
                                        <Tag
                                            key={genre.id}
                                            size='lg'
                                            colorScheme='green'
                                            borderRadius='full'
                                            m={5}
                                        >
                                            <TagLabel mx={3} >
                                                {genre.name}
                                            </TagLabel>
                                        </Tag>

                                    ))}
                                </Box>
                                {trailersData && trailersData.key && (
                                    <a href={`https://www.youtube.com/watch?v=${trailersData.key}`} target='_blank'>
                                        <Button colorScheme='green'>VER TRAILER</Button>
                                    </a>
                                )}
                            </Flex>
                            <Box>
                                <Text>Creditos:</Text><br />
                                <Box>
                                    {creditos && creditos.cast && creditos.cast.filter(actor => actor.profile_path).slice(0, 5).map((actor) => (
                                        <Box key={actor.id}>
                                            <Text>{actor.name}</Text> <br />
                                            {actor.profile_path && <Image src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} borderRadius="md" alt={actor.name} />}
                                            <strong>Personaje:</strong> <p>{actor.character}</p>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Box>


                    </>
                )}
            </Flex>
        </>
    );
}
