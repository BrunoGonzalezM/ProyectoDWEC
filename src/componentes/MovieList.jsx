import React, { useEffect, useState, useRef } from 'react';
import "../styles/stylesMovieList.css";
import { fetchMovies } from "../funciones/fetch";
import { Link } from 'react-router-dom';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Card from "./Card";

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
          {[
            { title: "Populares", movies: movies },
            { title: "Mejor valoradas", movies: moviesTop },
            { title: "Más vistas", movies: moviesNowPlay }
          ].map(({ title, movies }) => (
            <div key={title}>
              <h1 className='tituloPelis'>{title}</h1>
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
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMoveLeft = () => {
    const newPosition = scrollLeft === 0 ? 0 : scrollLeft - 220;
    ref.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    setScrollLeft(newPosition);
  };

  const handleMoveRight = () => {
    const newPosition = scrollLeft === 3520 ? 3520 : scrollLeft + 220;
    ref.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    setScrollLeft(newPosition);
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
                  <Link  to={`/pelicula/id/${movie.id}`}>
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
