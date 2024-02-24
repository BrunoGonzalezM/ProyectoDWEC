import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieTrailers, fetchMovieDetails, fetchCreditos, fetchKeywords, fetchSimilar, fetchWatchProviders } from '../funciones/fetch.jsx';
import CircleProgressBar from './CircleProgressBar.jsx';
import { Box, Button, Heading, Text, Flex, Image, Stack } from "@chakra-ui/react";
import { traductor } from "../assets/categoriasYTraduccion.js";
import { FaLink } from "react-icons/fa6";
import { PalabrasClave, PeliculasRecomendadas, Reparto, PeliculasSimilares, Detalle } from './RecommdSimilarReparto.jsx';

export default function DetallesPeliculaYSeries({ isMovie }) {
    const [trailersData, setTrailers] = useState(null);
    const [error, setError] = useState(null);
    const [detalles, setDetalles] = useState(null);
    const [creditos, setCreditos] = useState();
    const [keywords, setKeywords] = useState(null);
    const [similar, setSimilar] = useState(null);
    const [recommended, setRecommended] = useState(null);
    const [watchProviders, setWatchProviders] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [trailersData, detalles, creditos, keywords, similar, recommended, watchProviders] = await Promise.all([
                    fetchMovieTrailers(id, isMovie),
                    fetchMovieDetails(id, isMovie),
                    fetchCreditos(id, isMovie),
                    fetchKeywords(id, isMovie),
                    fetchSimilar(id, "similar", isMovie),
                    fetchSimilar(id, "recommendations", isMovie),
                    fetchWatchProviders(id, isMovie)
                ]);
                setTrailers(trailersData);
                setDetalles(detalles);
                setCreditos(creditos);
                setKeywords(keywords);
                setSimilar(similar);
                setRecommended(recommended);
                setWatchProviders(watchProviders);
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

    return (
        <>
            <Box bg="#222222" color="white" minH="100vh" >
                <Flex
                    id="detallesPelicula" bg="#222222" color="white"
                    flexDirection="column" justifyContent="center"
                    alignContent="center" h="100%" overflowX="hidden"
                >
                    {detalles && (detalles.title || detalles.name) && (
                        <>
                            <Box
                                // Imagen de fondo difuminada
                                w="100vw" h="34em"
                                backgroundImage={`url(${`https://image.tmdb.org/t/p/original/`}${detalles.backdrop_path})`}
                                backgroundPosition="top" backgroundSize="cover" backgroundRepeat="no-repeat" opacity="25%"
                            >
                            </Box>
                            <Flex
                                // Container de detalles
                                position="absolute" top="8em" flexDirection="column" justifyContent="center"
                                alignContent="center" boxSizing='border-box' w="100%" px="2em"
                            >
                                <Flex flexDirection="column" justifyContent="center" alignContent="center" px={10} >
                                    {detalles.poster_path &&
                                        <>
                                            <Flex flexDirection="row" justifyContent="center">
                                                <Image
                                                    // Imagen principal de la pelicula
                                                    maxW="25%" minW="250px" maxH="360px" minH="360px"
                                                    src={`${imgURL}${detalles.poster_path}`}
                                                    alt={`Poster de ${detalles.title}`}
                                                    borderRadius="md"
                                                />
                                                <Flex
                                                    flexDirection="column" justifyContent="space-between"
                                                    px={5} height="maxContent" maxW="100%" width="100%"
                                                >
                                                    {/* Titulo y detalles */}
                                                    <Box>
                                                        <Flex flexDirection="row" w="100%">
                                                            {isMovie ? (
                                                                <Heading mx={5} pr="4em">{detalles.title}</Heading>
                                                            ) : (
                                                                <Heading mx={5} pr="4em">{detalles.name} ({detalles.first_air_date ? new Date(detalles.first_air_date).getFullYear() : ""})</Heading>
                                                            )}
                                                            <Flex
                                                                justifyContent="end" fontSize="2xl" float="right"
                                                                position="absolute" right="4em" top="0"
                                                            >
                                                                {/* Componente circulo de valoracion */}
                                                                <CircleProgressBar max={100} value={detalles.vote_average.toFixed(1) * 10} />
                                                            </Flex>
                                                        </Flex>
                                                        {/* Descripcion de la pelicula si es que hay y generos */}
                                                        <Text fontSize="2xl" mx={5} pt="0.5em" > {detalles.tagline}</Text>
                                                        {isMovie ? (
                                                            <Text fontSize="lg" mx={5} pt="0.5em" color="whiteAlpha.800">
                                                                • {new Date(detalles.release_date).toLocaleDateString()} • {Math.floor(detalles.runtime / 60)}h {detalles.runtime % 60}m
                                                            </Text>
                                                        ) : (
                                                            <Text fontSize="lg" mx={5} pt="0.5em" color="whiteAlpha.800">
                                                                • {"Temporadas: " + (detalles.number_of_seasons)} • {"Episodios: " + (detalles.number_of_episodes)}
                                                            </Text>
                                                        )}
                                                        {/* Descripcion  */}
                                                        {detalles.overview && (
                                                            <Text fontSize="1xl" maxW={900} mx={5} pr="6em" pt="1em" color="whiteAlpha.800" noOfLines={6} >
                                                                {detalles.overview}
                                                            </Text>
                                                        )}
                                                        {/* Generos */}
                                                        <Box mt="1em">
                                                            <Stack direction='row' mx="1.2rem" >
                                                                {detalles.genres.map((genre) => (
                                                                    <Link key={genre.id} to={`/categoria/${genre.id}`}>
                                                                        <Box _hover={{ transform: "scale(1.08)" }} transition="0.5s" bg="#CC3344" p="0.3em" fontSize={12} borderRadius="0.5em" color="white">
                                                                            {genre.name}
                                                                        </Box>
                                                                    </Link>
                                                                ))}
                                                            </Stack>
                                                        </Box>
                                                        {/* Personas involucradas:  */}
                                                        {isMovie ? (
                                                            <Flex m="1em" w="100%" flexDirection="row" justifyContent="start" >
                                                                {/* Dificil de explicar quiza lo quitemos */}
                                                                {creditos && (
                                                                    <Box mr="1em" display="flex" w="50em" >
                                                                        {creditos.map((credito, index) => {
                                                                            if (credito.known_for_department !== "Acting" &&
                                                                                creditos.findIndex(c => c.name === credito.name) === index) {
                                                                                return (
                                                                                    <Box key={credito.id} mr="1em" maxW="13em" >
                                                                                        <Text color="whiteAlpha.700">{traductor[credito.known_for_department]}:</Text>
                                                                                        {credito.name}
                                                                                    </Box>
                                                                                );
                                                                            }
                                                                            return null;
                                                                        })}
                                                                    </Box>
                                                                )}
                                                            </Flex>
                                                        ) : (
                                                            <Flex m="1em" w="100%" flexDirection="row" justifyContent="start" >
                                                                {detalles.created_by && (
                                                                    <Box mr="1em" maxW="13em" noOfLines={3}>
                                                                        {detalles.created_by && <Text color="whiteAlpha.800">Creado por:</Text>}
                                                                        {detalles.created_by.map((creador) => (
                                                                            <Link key={creador.id} to={`/personas/id/${creador.id}`}>
                                                                                <Text fontSize="18px" color="whiteAlpha.900">{creador.name}</Text>
                                                                            </Link>
                                                                        ))}
                                                                    </Box>
                                                                )}
                                                            </Flex>
                                                        )}
                                                    </Box>
                                                    {/* Mostrar trailer si es que hay*/}
                                                    {trailersData && trailersData.key && (
                                                        <Button
                                                            mx={5} mt={2} bg='#CC3344' color="white" _hover={{ bg: 'red.800' }}
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

                            <Flex pt="2em" overflow="hidden" bg="#00000069" pb="10em" >
                                <Box maxW="75%">
                                    {/* REPARTO */}
                                    <Reparto creditos={creditos} />
                                    {/* SIMILARES */}
                                    <PeliculasSimilares similar={similar} />
                                    {!isMovie && (
                                        <Flex justifyContent="left" alignItems="center" fontSize="24px" color="#CC3344" pt="2em">
                                            <Link to={`/serie/id/${detalles.id}/temporadas`} style={{ textDecoration: 'none' }}>
                                                <Text _hover={{ color: '#822727' }} fontWeight="bold"> Ver Todas las Temporadas </Text>
                                            </Link>
                                        </Flex>
                                    )}

                                </Box>

                                {/* INFORMACION ADICIONAL ASIDE DERECHO */}
                                <Flex w="20em" flexDirection="column" p="2" minH="80vh">
                                    <Box>
                                        <Text fontSize="24px" mx={5} color="whiteAlpha.900"> Información adicional </Text>
                                        <Box mx={5} pt="0.1em" color="whiteAlpha.900" pb="1em">
                                            <Link to={detalles.homepage} target="_blank" title="Visita la página principal">
                                                <FaLink size={24} mb="1em" />
                                            </Link>
                                        </Box>
                                        {/* Contenido aside derecho con detalles adicionales de la pelicula o serie */}
                                        <>
                                            <Detalle titulo="Título original" valor={detalles.original_title} />
                                            <Detalle titulo="Estado" valor={traductor[detalles.status] || detalles.status || "Estado de la serie desconocido"} />
                                            <Detalle titulo="Canal" tipo="imagen" watchProviders={watchProviders} />
                                            <Detalle titulo="Idioma original" valor={traductor[detalles.original_language] || detalles.original_language || "No hay idioma original para esta película"} />
                                            <Detalle titulo="Presupuesto" valor={detalles.budget ? (detalles.budget).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : "-"} />
                                            <Detalle titulo="Ingresos" valor={detalles.revenue ? (detalles.revenue).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : "-"} />
                                        </>

                                    </Box>
                                    {/* PALABRAS CLAVE */}
                                    <PalabrasClave keywords={keywords} />

                                    {/* RECOMENDADAS */}
                                    <PeliculasRecomendadas recommended={recommended} isMovie={isMovie} handleClick={handleClick} />

                                </Flex>
                            </Flex>
                        </>
                    )}
                </Flex>
            </Box >
        </>
    );
}
