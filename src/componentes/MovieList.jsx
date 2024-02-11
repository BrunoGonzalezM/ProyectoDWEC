import React, { useEffect, useState, useRef } from 'react';
import { fetchMovies } from "../funciones/fetch";
import { Link } from 'react-router-dom';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Banner from './Banner';
import { Card, CardBody, Image, Stack, Heading, Text, Flex, Box, UnorderedList, ListItem, Spinner } from "@chakra-ui/react"
import Tarjeta from './Tarjeta';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [moviesTop, setMoviesTop] = useState([]);
  const [moviesNowPlay, setMoviesNowPlay] = useState([]);
  const [moviesTrending, setMoviesTrending] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (category, setter) => {
      try {
        const moviesData = await fetchMovies(category);
        setter(moviesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData(1, setMovies);
    fetchData(2, setMoviesTop);
    fetchData(3, setMoviesNowPlay);
    fetchData(4, setMoviesTrending)

  }, []);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
      color="white"
      backgroundColor="#222222"
      height="max-content"
      width="100%">
      {error ? (<p>{error}</p>) : (
        <Box
          overflowX="hidden"
          padding="0">
          {loading ? (
            <Flex h="90vh" >
              <Spinner
                margin="auto 0"
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
              />
            </Flex>
          ) : (
            <>
              <Banner movies={moviesTrending} />

              <Box p="1em">
                {[
                  { title: "Populares", movies: movies },
                  { title: "Mejor valoradas", movies: moviesTop },
                  { title: "Más vistas", movies: moviesNowPlay },
                  { title: "Tendencias", movies: moviesTrending }
                ].map(({ title, movies }) => (
                  <Heading key={title}>
                    <Box marginLeft="2em">
                      {title}
                    </Box>
                    <MovieCarousel movies={movies} ul loading={loading} />
                  </Heading>
                ))}
              </Box>
            </>
          )}
        </Box>
      )}
    </Flex>

  );
};

export const MovieCarousel = ({ movies, ul, loading }) => {
  const ref = useRef(null);
  const [scroll, setScroll] = useState(0);

  const handleMoveLeft = () => {
    const newPosition = scroll === 0 ? 0 : scroll - 220;
    ref.current.scrollTo({ left: newPosition, behavior: 'smooth' });
    setScroll(newPosition);
  };

  const handleMoveRight = () => {
    const newPosition = scroll >= 4115 ? 4115 : scroll + 220;
    ref.current.scrollTo({ left: newPosition, behavior: 'smooth' });
    setScroll(newPosition);
  };
  return (
    <>
      {ul ? (
        <Flex
          className="MovieList" flexDirection="row"
          paddingInline="0em" alignItems="center"
        >
          <Box
            className="left"
            _hover={{ transform: "scale(1.6)", color: "white", }}
            height="100%"
            transition=".4s"
            color="#a7a7a7"
          >
            <IoIosArrowBack className='left' onClick={handleMoveLeft} size={40} />
          </Box>
          <UnorderedList
            display="flex"
            listStyleType="none"
            overflow="hidden"
            padding="40px 0"
            flex="0 0 calc(100vw - 4em)"
            margin="0em"
            maxWidth="calc(100vw - 4em)"
            paddingInline="1em" ref={ref}
          >
            {movies.map((movie) => (
              <ListItem
                backgroundColor="#00000030"
                margin="0 1em 0 0"
                cursor="pointer"
                transition="1s"
                borderRadius="5px"
                key={movie.id}
                _hover={{ transform: "scale(1.08)", }}
              >
                <Link to={`/pelicula/id/${movie.id}`}>
                  <Tarjeta movie={movie} />
                </Link>
              </ListItem>
            ))}
          </UnorderedList>
          <Box
            className="right"
            _hover={{ transform: "scale(1.6)", color: "white", }}
            height="100%"
            transition=".4s"
            color="#a7a7a7"
          >
            <IoIosArrowForward className='right' onClick={handleMoveRight} size={40} />
          </Box>
        </Flex >
      ) : (
        <>
          {/* PELICULAS POR CATEGORIA  y POR BUSQUEDA  QUEDA A CAMBIAR CARD POR TARJETA.JSX */}
          <Flex
            className="MovieList"
            flexDirection="row"
            paddingInline="0em"
            alignItems="center"
            flexWrap="wrap"
            backgroundColor="#00000030"
          >
            {movies.map((movie) => (
              <UnorderedList
                key={movie.id}
                display="flex"
                listStyleType="none"
                overflow="hidden"
                padding="40px 0"
                flex="0 0 20em"
                justifyContent="center"
                alignContent="center"
                maxWidth="calc(100vw - 9em)"
                paddingInline="1em"
                ref={ref}
              >
                <Link to={`/pelicula/id/${movie.id}`}  >
                  <Card
                    size="sm"
                    h="maxContent"
                    borderRadius='lg'
                    backgroundColor="#00000030"
                    transition="1s"
                    _hover={{ transform: "scale(1.08)" }}
                  >
                    <CardBody
                      h="367px"
                      w="250px"
                      p="3"
                      borderRadius='lg'
                      bg="black.800"
                    >
                      <Image
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={`${movie.title}`}
                        borderRadius='md'
                        minW='60px'
                        minH="330px"
                        placeItems="center"
                      />
                      <Stack mt='6' spacing='3' color="white">
                        <Heading
                          size='md'
                          noOfLines={1}
                        >
                          {movie.title}
                        </Heading>
                        {movie.overview ? (
                          <Text noOfLines={3}>
                            {`${movie.overview}`}
                          </Text>
                        ) : (
                          <Box mt={3}>
                            <br />
                            <br />
                            <br />
                          </Box>
                        )}
                        <Text color='blue.600' fontSize='2xl'>
                          {movie.vote_average.toFixed(1)}/10
                        </Text>
                      </Stack>
                    </CardBody>
                  </Card>
                </Link>
              </UnorderedList>
            ))}
          </Flex>
        </>
      )}
    </>
  );
};
export default MovieList;
