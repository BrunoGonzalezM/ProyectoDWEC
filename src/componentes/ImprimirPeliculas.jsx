import React, { useEffect, useState } from 'react';
import { fetchMovies, moviesPopular, moviesTrending, moviesTopRated, moviesNowPlaying } from "../funciones/fetch";
import { Flex, Box, Spinner } from "@chakra-ui/react";
import Banner from './Banner';
import MovieCarousel from './MovieCarousel';

const ImprimirPeliculas = () => {
  const [movies, setMovies] = useState([]);
  const [moviesTop, setMoviesTop] = useState([]);
  const [moviesNowPlay, setMoviesNowPlay] = useState([]);
  const [moviesTrending, setMoviesTrending] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (category, setter) => {
      try {
        const moviesData = await fetchMovies(category, 1);
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
    fetchData(4, setMoviesTrending);
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
        <Box overflowX="hidden" padding="0">
          {loading ? (
            <Flex h="90vh">
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
                <MovieCarousel conSlider title="Populares" movies={movies} />
                <MovieCarousel conSlider title="Mejor valoradas" movies={moviesTop} />
                <MovieCarousel conSlider title="Más vistas" movies={moviesNowPlay} />
                <MovieCarousel conSlider title="Tendencias" movies={moviesTrending} />
              </Box>
            </>
          )}
        </Box>
      )}
    </Flex>
  );
};

export default ImprimirPeliculas;