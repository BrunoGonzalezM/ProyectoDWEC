import { Link } from "react-router-dom";
import { Card, CardBody, CardFooter, Image, Heading, Text, Button, Box, Flex, Stack, Badge, Stat, StatHelpText, StatArrow } from '@chakra-ui/react';

export default function Banner({ movies }) {
    return (
        <>
            {movies.slice(0, 1).map((movie) => {
                if (movie) {
                    return (
                        <>
                            <Flex
                                flexDirection="row"

                            >
                                <Flex
                                    //IMAGEN DE FONDO
                                    w={`calc(100vw - 2em)`}
                                    h={`calc(100vh - 50vh)`}
                                    mb="15em"
                                    position="abosulte"
                                    backgroundImage={`url(https://image.tmdb.org/t/p/w500${movie.poster_path})`}
                                    backgroundPosition="center"
                                    transform="scale(2)"
                                    filter="blur(20px)"
                                    backgroundRepeat="repeat"
                                >
                                </Flex>
                                <Flex
                                    //CONTENIDO DE movie
                                    position="absolute"
                                    left="0em"
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
                                        {movie.poster_path &&
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
                                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                        alt={`Poster de ${movie.title}`}
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
                                                        {/* movie TEXTO */}
                                                        <Box>
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
                                                                </Stat>
                                                            </Flex>
                                                            <Text fontSize="2xl" mx={5}> {movie.tagline}</Text>
                                                            <Text fontSize="1xl" maxW={900} m={5} > {movie.overview}</Text>
                                                            <Box>

                                                            </Box>
                                                        </Box>
                                                    </Flex>
                                                </Flex>
                                            </>
                                        }
                                    </Flex>
                                </Flex>
                            </Flex>
                        </>
                    );
                }
                return null;
            })}
        </>
    );
}
