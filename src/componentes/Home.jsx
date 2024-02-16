import React, { useEffect, useState } from 'react';
import { moviesPopular, moviesTrending, moviesTopRated, moviesNowPlaying } from "../funciones/fetch";
import { Flex, Box, Spinner } from "@chakra-ui/react";
import Banner from './Banner';
import MovieCarousel from './MovieCarousel';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [moviesTop, setMoviesTop] = useState([]);
  const [moviesNowPlay, setMoviesNowPlay] = useState([]);
  const [moviesTrend, setMoviesTrend] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movies, moviesTop, moviesNowPlay, moviesTrend] = await Promise.all([
          moviesPopular(1,1,true),
          moviesTopRated(1),
          moviesNowPlaying(1),
          moviesTrending(1)
        ])
        setMovies(movies)
        setMoviesTop(moviesTop)
        setMoviesNowPlay(moviesNowPlay)
        setMoviesTrend(moviesTrend)

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
              <Banner movies={moviesTrend} />
              <Box p="1em">
                <MovieCarousel conSlider title="Populares" movies={movies} />
                <MovieCarousel conSlider title="Mejor valoradas" movies={moviesTop} />
                <MovieCarousel conSlider title="Más vistas" movies={moviesNowPlay} />
                <MovieCarousel conSlider title="Tendencias" movies={moviesTrend} />
              </Box>
            </>
          )}
        </Box>
      )}
    </Flex>
  );
};

export default Home;