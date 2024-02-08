import React, { useEffect, useState, useRef } from 'react';
import "../styles/stylesMovieList.css";
import { fetchMovies } from "../funciones/fetch";
import { Link } from 'react-router-dom';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Banner from './Banner';
import { Card, CardBody, Image, Stack, Heading, Text, Flex, Box, UnorderedList, ListItem } from "@chakra-ui/react"

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [moviesTop, setMoviesTop] = useState([]);
  const [moviesNowPlay, setMoviesNowPlay] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async (category, setter) => {
      try {
        const moviesData = await fetchMovies(category);
        setter(moviesData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData(1, setMovies);
    fetchData(2, setMoviesTop);
    fetchData(3, setMoviesNowPlay);
  }, []);


  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
      color="white"
      backgroundColor="#222222"
      height="max-content"
      width="100%"
    >
      {error ? (
        <p>{error}</p>
      ) : (
        <Box
          overflowX="hidden"
          padding="1em"
        >
          <Banner movies={movies} />
          {[
            { title: "Populares", movies: movies },
            { title: "Mejor valoradas", movies: moviesTop },
            { title: "Más vistas", movies: moviesNowPlay }
          ].map(({ title, movies }) => (
            <div key={title}>
              <Box
                className="tituloPelis"
                marginLeft="2.5em"
              >
                {title}
              </Box>
              <MovieCarousel movies={movies} ul="1" />
            </div>
          ))}
        </Box>
      )}
    </Flex>
  );
};

export const MovieCarousel = ({ movies, ul }) => {
  const ref = useRef(null);
  const [scroll, setScroll] = useState(0);

  const handleMoveLeft = () => {
    const newPosition = scroll === 0 ? 0 : scroll - 220;
    ref.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    setScroll(newPosition);
  };

  const handleMoveRight = () => {
    const newPosition = scroll >= 4115 ? 4115 : scroll + 220;
    ref.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    setScroll(newPosition);
  };

  return (
    <>
      {ul ? (

        <Flex
          className="MovieList"
          flexDirection="row"
          paddingInline="0em"
          alignItems="center"
        >
          <Box
            className="left"
            _hover={{
              transform: "scale(1.6)",
              color: "white",
            }}
            height="100%"
            transition=".4s"
            color="#a7a7a7"
          >
            <IoIosArrowBack className='left' onClick={handleMoveLeft} size={40} /></Box>
          <UnorderedList
            display="flex"
            listStyleType="none"
            overflow="hidden"
            padding="40px 0"
            flex="0 0 calc(100vw - 9em)"
            margin="1em"
            maxWidth="calc(100vw - 9em)"
            paddingInline="1em"
            ref={ref}
          >
            {movies.map((movie) => (
              <ListItem
                flex="0 0 0px"
                backgroundColor="#00000030"
                margin="0 20px 0 0"
                userSelect="none"
                cursor="pointer"
                transition="1s"
                borderRadius="5px"
                minH="270px"
                key={movie.id}
                _hover={{
                  transform: "scale(1.08)",
                }}
              >
                <Link to={`/pelicula/id/${movie.id}`}>
                  <Card size="sm" h="maxContent" borderRadius='lg' bg="transparent"  >
                    <CardBody minH="367px" minW="250px" p="3" borderRadius='lg' bg="black.800"  >
                      <Image
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={`${movie.title}`}
                        borderRadius='md'
                        w='100%'
                        h="330px"
                      />
                      <Stack mt='6' spacing='3' color="white">
                        <Heading size='md' noOfLines={1}>{`${movie.title}`}</Heading>
                        {movie.overview ? (
                          <Text noOfLines={3}>
                            {`${movie.overview}`}
                          </Text>
                        ) : (
                          <div>
                            <br></br><br></br><br></br>
                          </div>
                        )}
                        <Text color='blue.600' fontSize='2xl'>
                          {movie.vote_average.toFixed(1)}/10
                        </Text>
                      </Stack>
                    </CardBody>
                  </Card>
                </Link>
              </ListItem>
            ))}
          </UnorderedList>
          <Box
            className="right"
            _hover={{
              transform: "scale(1.6)",
              color: "white",
            }}
            height="100%"
            transition=".4s"
            color="#a7a7a7"
          >
            <IoIosArrowForward className='right' onClick={handleMoveRight} size={40} />
          </Box>
        </Flex >
      ) : (
        <>
          {movies.map((movie) => (
            <li key={movie.id}  >
              <Link to={`/pelicula/id/${movie.id}`}>
                <Card size="sm" h="maxContent" borderRadius='lg' bg="transparent"  >
                  <CardBody minH="367px" minW="250px" p="3" borderRadius='lg' bg="black.800"  >
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={`${movie.title}`}
                      borderRadius='md'
                      w='100%'
                      h="330px"
                    />
                    <Stack mt='6' spacing='3' color="white">
                      <Heading size='md' noOfLines={1}>{`${movie.title}`}</Heading>
                      {movie.overview ? (
                        <Text noOfLines={3}>
                          {`${movie.overview}`}
                        </Text>
                      ) : (
                        <div>
                          <br></br><br></br><br></br>
                        </div>
                      )}
                      <Text color='blue.600' fontSize='2xl'>
                        {movie.vote_average.toFixed(1)}/10
                      </Text>
                    </Stack>
                  </CardBody>
                </Card>
              </Link>
            </li>
          ))}
        </>
      )}
    </>
  );
};
export default MovieList;
