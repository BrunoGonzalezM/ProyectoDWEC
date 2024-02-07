import React, { useEffect, useState, useRef } from 'react';
import "../styles/stylesMovieList.css";
import { fetchMovies } from "../funciones/fetch";
import { Link } from 'react-router-dom';
import { IoIosArrowForward , IoIosArrowBack} from "react-icons/io";
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
              <h1>{title}</h1>
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

const MovieCarousel = ({ movies}) => {
  const ref = useRef(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [trackMouse, setTrackMouse] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(true);

  const handleMouseMove = (e, ref, trackMouse, startX, startScrollLeft, setAnimationComplete) => {
    if (!ref.current || !trackMouse) return;
    setAnimationComplete(false);
    const xVal = e.pageX - ref.current.offsetLeft;
    const walk = (xVal - startX) * 1;
    const newScrollLeft = startScrollLeft - walk;
    ref.current.scrollLeft = newScrollLeft;
    setAnimationComplete(true);
  };
  
  const handleMouseDown = (e, ref, setTrackMouse, setStartX, setStartScrollLeft) => {
    if (!ref.current) return;
    setTrackMouse(true);
    const startX = e.pageX - ref.current.offsetLeft;
    const startScrollLeft = ref.current.scrollLeft;
    setStartX(startX);
    setStartScrollLeft(startScrollLeft);
  };
  
  const handleMouseLeave = (setTrackMouse) => {
    setTrackMouse(false);
  };
  
  const handleMouseUp = (setTrackMouse) => {
    setTrackMouse(false);
  };

  const handleMoveLeft = () => {
    ref.current.scrollLeft -= 100;
  };

  const handleMoveRight = () => {
    ref.current.scrollLeft += 100; 
  };

  return (
    <div className="MovieList">
      <IoIosArrowBack className='left' onClick={handleMoveLeft} size={100}  />
      <ul className='carrusel'
        ref={ref}
        onMouseMove={(e) => handleMouseMove(e, ref, trackMouse, startX, scrollLeft, setAnimationComplete)}
        onMouseDown={(e) => { e.preventDefault(); handleMouseDown(e, ref, setTrackMouse, setStartX, setScrollLeft); }}
        onMouseUp={() => handleMouseUp(setTrackMouse)}
        onMouseLeave={() => handleMouseLeave(setTrackMouse)}
      >
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/pelicula/id/${movie.id}`}>
              <Card imgUrl={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} title={movie.title} />
            </Link>
          </li>
        ))}
      </ul>
      <IoIosArrowForward className='right' onClick={handleMoveRight} size={100} />
      
    </div>
  );
};

export default MovieList;
