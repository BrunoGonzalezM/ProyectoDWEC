import React from 'react';
import Slider from "react-slick";
import "../styles/banner.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { Image, Heading, Text, Button, Stat, StatHelpText, StatArrow, Box, Flex } from '@chakra-ui/react';
import { TriangleUpIcon, AddIcon } from "@chakra-ui/icons";

export default function Banner({ movies }) {
    const config = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };

    return (
        <Slider {...config}>
            {movies.slice(0, 21).map((movie) => (
                <div key={movie.id}>
                    <Flex
                        //CONTENIDO DE movie
                        flexDirection="column"
                        justifyContent="center"
                        alignContent="center"
                        boxSizing='border-box'
                        bg="#00000069"
                        w="100%"
                        h="maxContent"
                    >
                        <Flex
                            flexDirection="column"
                            justifyContent="center"
                            alignContent="center"
                            p={10}
                        >
                            {movie.poster_path &&
                                <>
                                    <Flex
                                        flexDirection="row"
                                        justifyContent="center"
                                        overflow="hidden"
                                    >
                                        <Image
                                            //IMAGEN DEL POSTER
                                            w="25%"
                                            h="100%"
                                            maxW="300px"
                                            maxH="400px"
                                            aspectRatio="3/5"
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            alt={`Poster de ${movie.title}`}
                                            borderRadius="0.7em"
                                            objectFit="cover"
                                            objectPosition="center"
                                            p="5px"
                                        />
                                        <Flex
                                            flexDirection="column"
                                            justifyContent="space-between"
                                            px={5}
                                            maxW="100%"
                                            width="calc(100vw - 35em)"
                                            h="100%"
                                        >
                                            {/* movie TEXTO */}
                                            <Box
                                                h="25em"
                                                display="flex"
                                                flexDirection="column"
                                                justifyContent="space-between"
                                            >
                                                {/* TITULOS DESCRIPCION Y VALORACION */}
                                                <Flex flexDirection="column" w="100%">
                                                    <Flex flexDirection="row" w="100%">
                                                        <Heading mx={5}>{movie.title} ({new Date(movie.release_date).getFullYear()})</Heading>
                                                        <Stat>
                                                            <Box float="right">
                                                                <Heading fontSize="2xl">{movie.vote_average.toFixed(1)}/10 </Heading>
                                                                <StatHelpText >
                                                                    <StatArrow type={(movie.id % 100) < 30 ? 'decrease' : 'increase'} />
                                                                    {((movie.vote_count % 50) * 0.3384).toFixed(2)}%
                                                                </StatHelpText>
                                                            </Box>
                                                        </Stat>                                                    </Flex>
                                                    <Text noOfLines={5} fontSize="md" maxW={900} m={5} color="whiteAlpha.800" >
                                                        {movie.overview}
                                                    </Text>
                                                </Flex>
                                                <>
                                                    <Text fontSize="2xl" mx={5}> {movie.tagline}</Text>
                                                    {/* BOTONES DE BANNER (PLAY AÑADIR A FAVORITOS Y DETALLES) */}
                                                    <Flex
                                                        w="full"
                                                        mx="2em"
                                                        alignItems="center"
                                                        paddingBottom="2em"
                                                    >
                                                        <Link
                                                            w="600px"
                                                            h="600px"
                                                            to={`/pelicula/id/${movie.id}`}  >
                                                            <Button
                                                                width="5em"
                                                                height="5em"
                                                                transform="rotate(90deg)"
                                                                aspectRatio="4/4"
                                                                borderRadius="full"
                                                                _hover={{ transform: "scale(1.2) rotate(90deg)" }}
                                                            >
                                                                <TriangleUpIcon boxSize="2em" />
                                                            </Button>
                                                        </Link>
                                                        <Link
                                                            w="200px"
                                                            h="200px"
                                                            to={`/pelicula/id/${movie.id}`}
                                                        >
                                                            <Button
                                                                mx="2em"
                                                                aspectRatio="4/4"
                                                                borderRadius="full"
                                                                transition="0.2s"
                                                                _hover={{ transform: "scale(1.2)" }}
                                                            >
                                                                <AddIcon />
                                                            </Button>
                                                        </Link>
                                                        <Link
                                                            w="200px"
                                                            h="200px"
                                                            to={`/pelicula/id/${movie.id}`}  >
                                                            <button className="learn-more">
                                                                <span className="circle" aria-hidden="true">
                                                                    <span className="icon arrow"></span>
                                                                </span>
                                                                <span className="button-text">Detalles</span>
                                                            </button>
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
            ))}
        </Slider>
    );
}
