import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieTrailers, fetchMovieDetails, fetchCreditos } from '../funciones/fetch';
import "../styles/stylesDetallesPelicula.css";
import { Box, Button, Heading, Text, Flex, Image, Stack, Badge, Stat,StatHelpText,StatArrow,} from "@chakra-ui/react";

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
                                //CONTENIDO DE DETALLES
                                position="absolute"
                                top="8em"
                                flexDirection="column"
                                justifyContent="center"
                                alignContent="center"
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
                                                            <Heading mx={5}>{detalles.title} ({new Date(detalles.release_date).getFullYear()})</Heading>
                                                            <Stat>
                                                                <Box float="right">
                                                                    <Heading fontSize="2xl">{detalles.vote_average.toFixed(1)}/10 </Heading>
                                                                    <StatHelpText >
                                                                        <StatArrow type={(detalles.id % 100) < 30 ? 'decrease' : 'increase'} />
                                                                        {((detalles.vote_count % 50) * 0.3384).toFixed(2)}%
                                                                    </StatHelpText>
                                                                </Box>
                                                            </Stat>
                                                        </Flex>
                                                        <Text fontSize="2xl" mx={5}> {detalles.tagline}</Text>
                                                        <Text fontSize="1xl" maxW={900} m={5} > {detalles.overview}</Text>
                                                        <Box>
                                                            <Stack direction='row' mx="1.2rem" >
                                                                {detalles.genres.map((genre) => (
                                                                    <Link key={genre.id} to={`/categoria/${genre.id}`}>
                                                                        <Badge colorScheme='green'>
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
                                            <strong>Personaje:</strong> <p>{actor.character}</p>
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
