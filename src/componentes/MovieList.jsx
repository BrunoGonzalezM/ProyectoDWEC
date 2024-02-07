import React, { useEffect, useState, useRef } from 'react';
import "../styles/stylesMovieList.css";
import { fetchMovies } from "../funciones/fetch";
import { Link } from 'react-router-dom';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Card from "./Card";
import Banner from './Banner';

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
          <Banner movies={movies}/>
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
    const newPosition = scroll === 3520 ? 3520 : scroll + 220;
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
      )}
    </>
  );
};
export default MovieList;
