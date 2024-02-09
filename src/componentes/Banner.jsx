import { Link } from "react-router-dom";
import { Card, CardBody, CardFooter, Image, Heading, Text, Button, Box, Flex, Stack, Badge, Stat, StatHelpText, StatArrow } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Icon, TriangleUpIcon, AddIcon } from "@chakra-ui/icons"
import 'swiper/css';
import "../styles/banner.css"
export default function Banner({ movies }) {

    return (
        <>
            <Box >
                <Swiper spaceBetween={0} slidesPerView={1}>
                    {movies.slice(0, 21).map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <Box>
                                <>
                                    <Flex flexDirection="row">

                                        <Flex
                                            //CONTENIDO DE movie
                                            flexDirection="column"
                                            justifyContent="center"
                                            alignContent="center"
                                            boxSizing='border-box'
                                            bg="#00000069"
                                            w="100%"
                                            h="calc(100vh - 10em)"
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
                                                                maxW="20%"
                                                                h="100%"
                                                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                                alt={`Poster de ${movie.title}`}
                                                                borderRadius="md"
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
                                                                <Box>
                                                                    <Flex flexDirection="row" w="100%">
                                                                        <Heading mx={5}>{movie.title}</Heading>
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

                                                                    <Flex
                                                                        w="full"
                                                                        mx="2em"
                                                                        alignItems="center"
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
                                                                                placeContent="center"
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
                                                                </Box>
                                                            </Flex>
                                                        </Flex>
                                                    </>
                                                }
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </Box>
        </>
    );
}
