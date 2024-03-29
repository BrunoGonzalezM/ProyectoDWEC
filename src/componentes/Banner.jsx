import React, { useEffect, useState } from 'react';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Link } from "react-router-dom";
import { Image, Heading, Text, Button, Stat, StatArrow, Box, Flex, useToast } from '@chakra-ui/react';
import { TriangleUpIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { fetchMovieTrailers } from '../services/fetch';

export default function Banner({ movies }) {
    //Configuracion del slider de react-slick
    const config = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };
    const toast = useToast()
    const id = 'test-toast'

    //Donde se guarda los trailers
    const [trailerData, setTrailers] = useState([]);
    const [error, setError] = useState(null);

    //En el useEffect hacemos un map a movies para sacar cada movie 
    //y con cada movie podemos hacerle un fetch para sacar cada trailer 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const trailers = await Promise.all(
                    movies.map(async (movie) => {
                        const trailerData = await fetchMovieTrailers(movie.id, true);
                        return trailerData;
                    })
                );
                setTrailers(trailers);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchData();
    }, []);

    return (
        <Slider {...config}>
            {movies.slice(0, 21).map((movie, index) => (
                <div key={movie.id}>
                    <Flex
                        //CONTENIDO DE movie
                        flexDirection="column" justifyContent="center" alignContent="center" boxSizing='border-box' w="100%" h="maxContent"
                        bg={`linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`}
                        backgroundPosition="top" backgroundSize="cover" backgroundRepeat="no-repeat"
                    >
                        <Flex flexDirection="column" justifyContent="center" alignContent="center" p={10}>
                            {movie.poster_path &&
                                <>
                                    <Flex flexDirection="row" justifyContent="center" overflow="hidden">
                                        <Image
                                            //IMAGEN DEL POSTER
                                            w="25%" h="100%" p="5px" maxW="300px" maxH="400px" aspectRatio="3/5"
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            alt={`Poster de ${movie.title}`} outline="1px solid white"
                                            borderRadius="0.7em" objectFit="cover" objectPosition="center"
                                        />
                                        <Flex
                                            flexDirection="column" justifyContent="space-between"
                                            px={5} maxW="100%" width="calc(100vw - 35em)" h="100%"
                                        >
                                            {/* PELICULA TEXTO */}
                                            <Box h="25em" display="flex" flexDirection="column" justifyContent="space-between">
                                                {/* TITULOS, DESCRIPCION Y VALORACION */}
                                                <Flex flexDirection="column" w="100%">
                                                    <Flex flexDirection="row" w="100%">
                                                        <Heading mx={5}>{movie.title} </Heading>
                                                        <Stat>
                                                            <Box float="right">
                                                                <Heading fontSize="2xl">{movie.vote_average.toFixed(1)}/10 </Heading>
                                                                <StatArrow type={(movie.id % 100) < 30 ? 'decrease' : 'increase'} /> {((movie.vote_count % 50) * 0.3384).toFixed(2)}%
                                                            </Box>
                                                        </Stat>
                                                    </Flex>
                                                    <Text noOfLines={5} fontSize="md" maxW={900} m={5} color="whiteAlpha.800" >
                                                        {movie.overview}
                                                    </Text>
                                                </Flex>
                                                <>
                                                    <Text fontSize="2xl" mx={5}> {movie.tagline}</Text>
                                                    {/* BOTONES DE BANNER (PLAY AÑADIR A FAVORITOS Y DETALLES) */}
                                                    <Flex w="full" mx="2em" alignItems="center" paddingBottom="2em">
                                                        {trailerData && (
                                                            <Button
                                                                width="5em" height="5em" transform="rotate(90deg)" aspectRatio="4/4" mr="5"
                                                                borderRadius="full" _hover={{ transform: "scale(1.2) rotate(90deg)" }}
                                                                //SI HAY TRAILER EN LA PELICULA LA ABRE, SINO SALE UN TOAST ERROR.
                                                                onClick={() => {
                                                                    if (trailerData[index]) {
                                                                        window.open(`https://www.youtube.com/watch?v=${trailerData[index].key}`);
                                                                    } else {
                                                                        if (!toast.isActive(id)) {
                                                                            toast({
                                                                                id, title: `No hay trailer`, containerStyle: { marginTop: "5em" },
                                                                                status: 'error', position: 'top', duration: 1200,
                                                                            });
                                                                        }
                                                                    }
                                                                }}
                                                            >
                                                                <TriangleUpIcon boxSize="2em" />
                                                            </Button>
                                                        )}
                                                        <Link w="200px" h="200px" to={`/pelicula/id/${movie.id}`} >
                                                            <Button width="2.5m" _hover={{ transform: "scale(1.2)" }}
                                                                height="2.5em" aspectRatio="4/4" borderRadius="full"
                                                            >
                                                                <InfoOutlineIcon boxSize="2em" />
                                                            </Button>
                                                        </Link>
                                                    </Flex>
                                                </>
                                            </Box>
                                        </Flex>
                                    </Flex>
                                </>
                            }
                        </Flex>
                    </Flex>
                </div>
            ))
            }
        </Slider >
    );
}
