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
              <MovieCarousel
                movies={movies}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const MovieCarousel = ({ movies }) => {
  const ref = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);


  const handleMoveLeft = () => {
    ref.current.scrollLeft -= 220;
  };

  const handleMoveRight = () => {
    ref.current.scrollLeft += 220;
  };

  return (
    <div className="MovieList">
      <IoIosArrowBack className='left' onClick={handleMoveLeft} size={100} />
      <ul ref={ref} >
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/pelicula/id/${movie.id}`}>
              <Card imgUrl={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} title={movie.title} desc={movie.overview}/>
            </Link>
          </li>
        ))}
      </ul>
      <IoIosArrowForward className='right' onClick={handleMoveRight} size={100} />

    </div>
  );
};

export default MovieList;
