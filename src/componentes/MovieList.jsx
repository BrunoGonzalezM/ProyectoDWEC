import React, { useEffect, useState, useRef } from 'react';
import "../styles/stylesMovieList.css";
import { fetchMovies } from "../funciones/fetch";
import { Link } from 'react-router-dom';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Banner from './Banner';
import { Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button } from "@chakra-ui/react"

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
    <div id="movies-list">
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="contenidoMovieList">
          <Banner movies={movies} />
          {[
            { title: "Populares", movies: movies },
            { title: "Mejor valoradas", movies: moviesTop },
            { title: "Más vistas", movies: moviesNowPlay }
          ].map(({ title, movies }) => (
            <div key={title}>
              <h2 className='tituloPelis'>{title}</h2>
              <MovieCarousel movies={movies} ul="1" />
            </div>
          ))}
        </div>
      )}
    </div>
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
      {ul == 1 ? (
        <div className="MovieList">
          <IoIosArrowBack className='left' onClick={handleMoveLeft} size={100} />
          <ul ref={ref} >
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
                        <Text noOfLines={3}>
                          {`${movie.overview}`}
                        </Text>
                        <Text color='blue.600' fontSize='2xl'>
                          {movie.vote_average.toFixed(1)}/10
                        </Text>
                      </Stack>
                    </CardBody>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
          <IoIosArrowForward className='right' onClick={handleMoveRight} size={100} />
        </div>
      ) : (
        <div>
          <div className='nolistado'>
            {movies.map((movie) => (
              <li key={movie.id} >
                <Card imgUrl={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} title={movie.title} desc={movie.overview} />
              </li>
            ))}
          </div>
        </div>)}


      {/* {ul == 1 ? (
        <div className="MovieList">
          <IoIosArrowBack className='left' onClick={handleMoveLeft} size={100} />
          <ul ref={ref} >
            {movies.map((movie) => (
              <li key={movie.id}>
                <Link to={`/pelicula/id/${movie.id}`}>
                  <Card imgUrl={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} title={movie.title} desc={movie.overview} />
                </Link>
              </li>
            ))}
          </ul>
          <IoIosArrowForward className='right' onClick={handleMoveRight} size={100} />
        </div>
      ) : (
        <div>
          <div className='nolistado'>
            {movies.map((movie) => (
              <li key={movie.id} >
                <Link to={`/pelicula/id/${movie.id}`}>
                  <Card imgUrl={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} title={movie.title} desc={movie.overview} />
                </Link>
              </li>
            ))}
          </div>
        </div>
      )} */}
    </>
  );
};
export default MovieList;
