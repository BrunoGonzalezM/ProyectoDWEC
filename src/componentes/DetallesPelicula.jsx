import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieTrailers, fetchMovieDetails, fetchCreditos } from '../funciones/fetch';
import CircleProgressBar from './CircleProgressBar';
import { Box, Button, Heading, Text, Flex, Image, Stack, Badge, Stat, StatHelpText, StatArrow, CircularProgress, } from "@chakra-ui/react";
import { transform } from 'framer-motion';

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
                                //IMAGEN DE FONDO
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
                                //CONTENIDO DE DETALLES
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
                                                    //IMAGEN DEL POSTER
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
                                                    {/* DETALLES TEXTO */}
                                                    <Box>
                                                        <Flex flexDirection="row" w="100%">
                                                            <Heading mx={5}>{detalles.title}</Heading>
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
                                                        <Text fontSize="2xl" mx={5} > {detalles.tagline}</Text>
                                                        <Text fontSize="1xl" maxW={900} m={5} pt="1em" color="whiteAlpha.800" noOfLines={7} >
                                                            {detalles.overview}
                                                        </Text>
                                                        <Box >
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
                                //CREDITOS
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

