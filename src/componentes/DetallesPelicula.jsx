import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieTrailers, fetchMovieDetails, fetchCreditos, fetchPersonId, fetchKeywords, fetchSimilarMovies } from '../funciones/fetch'; // Asegúrate de importar fetchPersonId
import CircleProgressBar from './CircleProgressBar';
import { Box, Button, Heading, Text, Flex, Image, Stack, Badge, Accordion, AccordionButton, AccordionIcon, AccordionPanel, AccordionItem } from "@chakra-ui/react";
import { traductor } from "../assets/categoriasYTraduccion.js";
import { FaLink } from "react-icons/fa6";
import Tarjeta from './Tarjeta';


export default function DetallesPelicula() {
    const [trailersData, setTrailers] = useState(null);
    const [error, setError] = useState(null);
    const [detalles, setDetalles] = useState(null);
    const [creditos, setCreditos] = useState({ cast: [] });
    const [keywords, setKeywords] = useState(null);
    const [similarMovies, setSimilarMovies] = useState(null);
    const [recommendedMovies, setRecommendedMovies] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [trailersData, detalles, creditos, keywords, similarMovies, recommendedMovies] = await Promise.all([
                    fetchMovieTrailers(id, true),
                    fetchMovieDetails(id, true),
                    fetchCreditos(id, true),
                    fetchKeywords(id),
                    fetchSimilarMovies(id, "similar"),
                    fetchSimilarMovies(id, "recommendations")
                ]);
                setTrailers(trailersData);
                setDetalles(detalles);
                setCreditos(creditos);
                setKeywords(keywords);
                setSimilarMovies(similarMovies);
                setRecommendedMovies(recommendedMovies);
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

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const todosLosTrabajos = [...new Set(creditos.cast.map(member => member.known_for_department))];

    const personasPorTrabajo = {};
    todosLosTrabajos.forEach(job => {
        personasPorTrabajo[job] = creditos.cast.filter(member => member.known_for_department === job);
    });

    return (
        <>
            <Box
                bg="#222222"
                minH="93.3vh"
            >
                <Flex
                    id="detallesPelicula"
                    bg="#222222"
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
                                h="34em"
                                backgroundImage={`url(${`https://image.tmdb.org/t/p/original/`}${detalles.backdrop_path})`}
                                backgroundPosition="top"
                                backgroundSize="cover"
                                backgroundRepeat="no-repeat"
                                opacity="25%"
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
                                w="100%"
                                px="2em"
                            >
                                <Flex
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignContent="center"
                                    px={10}
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
                                                        <Text fontSize="2xl" mx={5} pt="0.5em" > {detalles.tagline}</Text>
                                                        <Text fontSize="lg" mx={5} pt="0.5em" color="whiteAlpha.800">
                                                            • {new Date(detalles.release_date).toLocaleDateString()} • {Math.floor(detalles.runtime / 60)}h {detalles.runtime % 60}m
                                                        </Text>
                                                        <Text fontSize="lg" mx={5} color="whiteAlpha.800">{detalles.certification}</Text>
                                                        {detalles.overview && (
                                                            <>
                                                                <Text fontSize="1xl" maxW={900} mx={5} pr="6em" pt="1em" color="whiteAlpha.800" noOfLines={6} >
                                                                    {detalles.overview}
                                                                </Text>
                                                            </>
                                                        )}
                                                        {/* Imprimir generos */}
                                                        <Box mt="1em">
                                                            <Stack direction='row' mx="1.2rem" >
                                                                {detalles.genres.map((genre) => (
                                                                    <Link key={genre.id} to={`/categoria/${genre.id}`}>
                                                                        <Badge _hover={{ transform: "scale(1.08)" }} transition="0.5s" bg="#CC3344" color="white">
                                                                            {genre.name}
                                                                        </Badge>
                                                                    </Link>
                                                                ))}
                                                            </Stack>
                                                        </Box>

                                                        <Flex
                                                            m="1em"
                                                            flexDirection="row"
                                                            justifyContent="start"
                                                            w="100%"
                                                        >
                                                            {/* Personas involucradas:  */}
                                                            {Object.entries(personasPorTrabajo).map(([job, personas]) => (
                                                                (job !== "Acting") && (
                                                                    <Box mr="1em" maxW="13em" noOfLines={3} >
                                                                        <Text color="whiteAlpha.800">
                                                                            {traductor[job] ? traductor[job] : job}:
                                                                        </Text>
                                                                        {personas.map((persona, index) => (
                                                                            <span key={persona.id}>
                                                                                <Link to={`/personas/id/${persona.id}`} >
                                                                                    {persona.name}{index !== personas.length - 1 && ', '}
                                                                                </Link>
                                                                            </span>
                                                                        ))}
                                                                    </Box>
                                                                )))}
                                                        </Flex>
                                                    </Box>
                                                    {/* Mostrar trailer si es que hay*/}
                                                    {trailersData && trailersData.key && (
                                                        <Button
                                                            mx={5} mt={2}
                                                            bg='#CC3344'
                                                            color="white"
                                                            _hover={{ bg: 'red.800' }}
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
                            <Flex
                                // Mostrar creditos de la pelicula
                                pt="2em"
                                overflow="hidden"
                                zIndex="1"
                                bg="#00000069"
                                pb="10em"
                            >
                                <Flex flex="3" flexDirection="column" h="20em" w="60%" pl="1em">
                                    <Box as="span" flex='1' textAlign='left'>
                                        <Text fontSize="24px" mx={5} color="whiteAlpha.900">
                                            Reparto
                                        </Text>
                                    </Box>
                                    <Flex
                                        flexDirection="row"
                                        justifyContent="space-evenly"
                                        mt="2em"
                                    >
                                        <Box display="flex" color="white" w="calc(100vw - 10em)" overflow="scroll" overflowY="hidden">
                                            {creditos && creditos.cast && creditos.cast.filter(actor => actor.profile_path).map((actor) => (
                                                <Flex key={actor.id} borderRadius="md" flexDirection="column" mx="1em">
                                                    <Flex flexDir="column" >
                                                        <Link to={`/personas/id/${actor.id}`}>
                                                            {actor.profile_path && <Image src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} alt={actor.name} minW="11em" borderRadius="0.5em 0.5em 0 0" />}
                                                        </Link>
                                                    </Flex>
                                                    <Flex bg="#222222" justifyContent="center" alignItems="center" h="25%" flexDirection="column" borderRadius="0 0 0.5em 0.5em" pt="1em">
                                                        <Link to={`/personas/id/${actor.id}`}>
                                                            <Text maxW="10em" textAlign="center">{actor.name}</Text>
                                                        </Link>
                                                        <Text maxW="10em" color="gray.300" textAlign="center">{actor.character}</Text>
                                                    </Flex>
                                                </Flex>

                                            ))}
                                        </Box>

                                    </Flex>
                                    {/* PELICULAS SIMILARES */}
                                    <Box as="span" flex='1' textAlign='left' pt="4em">
                                        <Text fontSize="24px" mx={5} color="whiteAlpha.900"> Películas similares</Text>
                                    </Box>
                                    <Flex flexDirection="row" mt="2em" justifyContent="space-evenly" >
                                        <Box display="flex" color="white" w="calc(100vw - 10em)" overflow="scroll" overflowY="hidden">
                                            {similarMovies.results.slice(0, 8).map((movie) => (
                                                <Link key={movie.id} to={`/pelicula/id/${movie.id}`} style={{ textDecoration: 'none' }}>
                                                    <Tarjeta movie={movie} conSlider />
                                                </Link>
                                            ))}
                                        </Box>
                                    </Flex>
                                </Flex>
                                <Flex flex="1" flexDirection="column" p="2">
                                    {/* INFORMACION ADICIONAL ASIDE DERECHO */}
                                    <Box>
                                        <Text fontSize="24px" mx={5} color="whiteAlpha.900"> Información adicional </Text>
                                        <Box mx={5} pt="0.1em" color="whiteAlpha.900" pb="1em">
                                            <Link to={detalles.homepage} target="_blank" rel="noopener noreferrer" title="Visita la página principal">
                                                <FaLink size={24} mb="1em" />
                                            </Link>
                                        </Box>
                                        {[
                                            { label: 'Título original', value: detalles.original_title || "No hay título original para esta película" },
                                            { label: 'Estado', value: traductor[detalles.status] || detalles.status || "Estado de la película desconocido" },
                                            { label: 'Presupuesto', value: detalles.budget ? (traductor[detalles.budget] || detalles.budget).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : "Presupuesto desconocido" },
                                            { label: 'Ingresos', value: detalles.revenue ? (traductor[detalles.revenue] || detalles.revenue).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : "Ingresos desconocidos" }
                                        ].map(({ label, value }, index) => (
                                            <React.Fragment key={index}>
                                                <Text fontSize="20px" mx={5} pt={index === 0 ? "0.1em" : "1em"} color="whiteAlpha.900">{label}</Text>
                                                <Text fontSize="18px" mx={5} pt="0.1em" color="whiteAlpha.800">{value}</Text>
                                            </React.Fragment>
                                        ))}
                                    </Box>

                                    {/* PALABRAS CLAVE */}
                                    {keywords && (
                                        <Flex flexDirection="column" pt="1em">
                                            <Text fontSize="20px" mx={5} color="whiteAlpha.900"> Palabras clave </Text>
                                            <Box display="flex" flexDirection="row" flexWrap="wrap" pl="1em">
                                                {keywords.keywords.map((keyword) => {
                                                    const primeraPalabra = keyword.name.split(" ")[0];
                                                    return (
                                                        <Link to={`/search/${primeraPalabra}`} key={keyword.id}>
                                                            <Button m="0.3em" fontSize="14px" color="white" bg="#CC3344" _hover={{ bg: 'red.800' }} size="sm">
                                                                {primeraPalabra}
                                                            </Button>
                                                        </Link>
                                                    );
                                                })}
                                            </Box>

                                        </Flex>
                                    )}
                                    {/* PELICULAS RECOMENDADAS */}
                                    {recommendedMovies && (
                                        <Flex flexDirection="column" pt="1em">
                                            <Text fontSize="20px" mx={5} color="whiteAlpha.900">
                                                Recomendaciones
                                            </Text>
                                            <Box display="flex" flexDirection="row" flexWrap="wrap" pl="1em">
                                                {recommendedMovies.results.slice(0, 8).map((movie) => (
                                                    <Link key={movie.id} to={`/pelicula/id/${movie.id}`} style={{ textDecoration: 'none' }}>
                                                        <Button onClick={handleClick} m="0.3em" fontSize="14px" color="white" bg="#CC3344" _hover={{ bg: 'red.800' }} size="sm">
                                                            {movie.title}
                                                        </Button>
                                                    </Link>
                                                ))}
                                            </Box>
                                        </Flex>
                                    )}
                                </Flex>
                            </Flex>
                        </>
                    )}
                </Flex>
            </Box >
        </>
    );
}
