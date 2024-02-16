import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieTrailers, fetchMovieDetails, fetchCreditos } from '../funciones/fetch';
import CircleProgressBar from './CircleProgressBar';
import { Box, Button, Heading, Text, Flex, Image, Stack, Badge } from "@chakra-ui/react";

export default function DetallesSeries() {
    const [trailersData, setTrailers] = useState(null);
    const [error, setError] = useState(null);
    const [detalles, setDetalles] = useState(null);
    const [creditos, setCreditos] = useState({ cast: [] });
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [trailersData, detalles, creditos] = await Promise.all([
                    fetchMovieTrailers(id),
                    fetchMovieDetails(id),
                    fetchCreditos(id)
                ]);
                setTrailers(trailersData);
                setDetalles(detalles);
                setCreditos(creditos);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    // URL de imagenes con un ancho de 500
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
                                // Imagen de fondo difuminada
                                w="100vw"
                                h="40em"
                                backgroundImage={`url(${imgURL}${detalles.poster_path})`}
                                backgroundPosition="center"
                                transform="scale(2)"
                                filter="blur(20px)"
                                backgroundRepeat="repeat"
                            >
                            </Box>
                            <Flex
                                // Container de detalles
                                position="absolute"
                                top="8em"
                                flexDirection="column"
                                justifyContent="center"
                                alignContent="center"
                                boxSizing='border-box'
                                bg="#00000069"
                                w="100%"
                                px="2em"
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
                                            >
                                                <Image
                                                    // Imagen principal de la pelicula
                                                    maxW="25%"
                                                    minW="250px"
                                                    maxH="360px"
                                                    minH="360px"
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
                                                    {/* Titulo y detalles */}
                                                    <Box>
                                                        <Flex flexDirection="row" w="100%">
                                                            <Heading mx={5} pr="4em">{detalles.title}</Heading>
                                                            <Flex
                                                                justifyContent="end"
                                                                fontSize="2xl"
                                                                float="right"
                                                                position="absolute"
                                                                right="4em"
                                                                top="0"
                                                            >
                                                                <CircleProgressBar max={100} value={detalles.vote_average.toFixed(1) * 10} />
                                                            </Flex>
                                                        </Flex>
                                                        {/* Descripcion de la pelicula si es que hay y generos */}
                                                        <Text fontSize="2xl" mx={5} > {detalles.tagline}</Text>
                                                        {detalles.overview && (
                                                            <>
                                                                <Text fontSize="1xl" maxW={900} mx={5} pr="6em" pt="1em" color="whiteAlpha.800" >
                                                                    {detalles.overview}
                                                                </Text>
                                                            </>
                                                        )}
                                                        <Box mt="1em">
                                                            <Stack direction='row' mx="1.2rem" >
                                                                {detalles.genres.map((genre) => (
                                                                    <Link key={genre.id} to={`/categoria/${genre.id}`}>
                                                                        <Badge _hover={{ transform: "scale(1.08)" }} transition="0.5s" colorScheme='green'>
                                                                            {genre.name}
                                                                        </Badge>
                                                                    </Link>
                                                                ))}
                                                            </Stack>
                                                        </Box>
                                                    </Box>
                                                    {/* Mostrar trailer si es que hay*/}
                                                    {trailersData && trailersData.key && (
                                                        <Button
                                                            mx={5} mt={2}
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
                                // Mostrar creditos de la pelicula
                                py="2em"
                                overflow="hidden"
                                zIndex="1"
                                bg="#00000069"
                            >
                                <Heading
                                    fontSize="3xl"
                                    textAlign="center"
                                >
                                    Creditos
                                </Heading>
                                <Flex
                                    flexDirection="row"
                                    justifyContent="space-evenly"
                                    m="2em"
                                >
                                    {creditos && creditos.cast && creditos.cast.filter(actor => actor.profile_path).slice(0, 5).map((actor) => (
                                        <Box key={actor.id}>
                                            <Text>
                                                {actor.name}
                                            </Text>
                                            <br />
                                            {actor.profile_path && <Image src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} borderRadius="md" alt={actor.name} />}
                                            <Text >Personaje:</Text> <Text noOfLines={1} w="12.5em" >{actor.character}</Text>
                                        </Box>
                                    ))}
                                </Flex>
                            </Box>
                        </>
                    )}
                </Flex>
            </Box >
        </>
    );
}

