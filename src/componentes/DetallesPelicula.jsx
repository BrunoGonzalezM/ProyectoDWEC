import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieTrailers, fetchMovieDetails, fetchCreditos, fetchPersonId } from '../funciones/fetch'; // Asegúrate de importar fetchPersonId
import CircleProgressBar from './CircleProgressBar';
import { Box, Button, Heading, Text, Flex, Image, Stack, Badge, Accordion, AccordionButton, AccordionIcon, AccordionPanel, AccordionItem } from "@chakra-ui/react";
import {traductor} from "../assets/categoriasYTraduccion.js"

const config = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
};

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
                const [trailersData, detalles, creditos] = await Promise.all([
                    fetchMovieTrailers(id, true),
                    fetchMovieDetails(id, true),
                    fetchCreditos(id, true)
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
                                                                        <Badge _hover={{ transform: "scale(1.08)" }} transition="0.5s" colorScheme='green'>
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
                                                                    <Box ml="1em" maxW="10em" noOfLines={2} >
                                                                        <Text fontWeight="bold" color="gray.500">
                                                                            {traductor[job]}:
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
                                <Accordion allowToggle>
                                    <AccordionItem>
                                        <AccordionButton>
                                            <Box as="span" flex='1' textAlign='left'>
                                                <Text fontSize={20}> Reparto </Text>
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                        <AccordionPanel pb={4}>
                                            <Flex
                                                flexDirection="row"
                                                justifyContent="space-evenly"
                                                m="2em"
                                            >
                                                {creditos && creditos.cast && creditos.cast.filter(actor => actor.profile_path).slice(0, 5).map((actor) => (
                                                    <Box key={actor.id}>
                                                        <Text>{actor.name}</Text>
                                                        <br />
                                                        <Link to={`/personas/id/${actor.id}`}>
                                                            {actor.profile_path && <Image src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} borderRadius="md" alt={actor.name} />}
                                                        </Link>
                                                        <Text>Personaje:</Text>
                                                        <Text noOfLines={1} w="12.5em">{actor.character}</Text>
                                                    </Box>
                                                ))}
                                            </Flex>
                                        </AccordionPanel>
                                    </AccordionItem>
                                </Accordion>
                            </Box>
                        </>
                    )}
                </Flex>
            </Box >
        </>
    );
}
