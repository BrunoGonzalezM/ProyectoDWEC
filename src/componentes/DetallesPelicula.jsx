import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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

    const imgURL = `https://image.tmdb.org/t/p/w500/`;

    return (
        <>
            <Box
                bg="black">
                <Flex
                    id="detallesPelicula"
                    bg="black"
                    color="white"
                    flexDirection="column"
                    justifyContent="center"
                    alignContent="center"
                    h="maxContent"
                    overflow="hidden"
                >
                    {detalles && detalles.title && (
                        <>
                            <Box
                                w={`calc(100vw - 2em)`}
                                h={`calc(100vh - 4em)`}
                                backgroundImage={`url(${imgURL}${detalles.poster_path})`}
                                backgroundPosition="center"
                                transform="scale(2)"
                                filter="blur(20px)"
                                backgroundRepeat="repeat"
                            >
                            </Box>
                            <Flex
                                position="absolute"
                                top="7em"
                                flexDirection="column"
                                justifyContent="center"
                                alignContent="center"
                                margin="0"
                                padding="0"
                                boxSizing='border-box'
                                bg="#00000069"
                                w="100%"
                            >
                                <Flex
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignContent="center"
                                    p={10}
                                >
                                    {detalles.poster_path &&
                                        <>
                                            <Flex
                                                flexDirection="row"
                                                justifyContent="center"
                                                px=""
                                            >
                                                <Image
                                                    maxW="25%"
                                                    minW="250px"
                                                    maxH="360px"
                                                    src={`${imgURL}${detalles.poster_path}`}
                                                    alt={`Poster de ${detalles.title}`}
                                                    borderRadius="md"
                                                />
                                                <Flex
                                                    flexDirection="column"
                                                    justifyContent="space-between"
                                                    px={5}
                                                    maxW="100%"
                                                    height="maxContent"
                                                    width="100%"
                                                >
                                                    <Box>
                                                        <Heading mx={5}>{detalles.title}</Heading>
                                                        <Text fontSize="2xl" mx={5}> {detalles.tagline}</Text>
                                                        <Text fontSize="1xl" maxW={900} m={5} > {detalles.overview}</Text>
                                                        <Box>
                                                            {detalles.genres.map((genre) => (
                                                                <Tag
                                                                    key={genre.id}
                                                                    size='lg'
                                                                    color='green'
                                                                    borderRadius='full'
                                                                    m={5}   
                                                                >
                                                                    <TagLabel mx={3} >
                                                                        <Link to={`/categoria/${genre.id}`}>
                                                                            <Box
                                                                                mx={5}
                                                                                color='green'
                                                                            >
                                                                                {genre.name}
                                                                            </Box>
                                                                        </Link>
                                                                    </TagLabel>
                                                                </Tag>
                                                            ))}
                                                        </Box>
                                                    </Box>
                                                    {trailersData && trailersData.key && (
                                                        <Button
                                                            mx={5}
                                                            colorScheme='green'
                                                            onClick={() => { window.open(`https://www.youtube.com/watch?v=${trailersData.key}`) }}
                                                        >
                                                            VER TRAILER
                                                        </Button>
                                                    )}
                                                </Flex>
                                            </Flex>
                                        </>
                                    }
                                </Flex>
                            </Flex>
                            <Box
                                my="1em"
                                overflow="hidden"
                                zIndex="1"
                            >
                                <Heading fontSize="3xl" mx="2em">
                                    Creditos:
                                </Heading>
                                <Flex
                                    flexDirection="row"
                                    justifyContent="space-evenly"
                                    m="2em"
                                >
                                    {creditos && creditos.cast && creditos.cast.filter(actor => actor.profile_path).slice(0, 5).map((actor) => (
                                        <Box key={actor.id}>
                                            <Text>{actor.name}</Text> <br />
                                            {actor.profile_path && <Image src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} borderRadius="md" alt={actor.name} />}
                                            <strong>Personaje:</strong> <p>{actor.character}</p>
                                        </Box>
                                    ))}
                                </Flex>
                            </Box>
                        </>
                    )}
                </Flex>
            </Box>
        </>
    );
}
