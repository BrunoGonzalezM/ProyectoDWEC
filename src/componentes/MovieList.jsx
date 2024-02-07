import Card from "./Card";
import React, { useEffect, useState, useRef } from 'react';
import "../styles/stylesMovieList.css";
import { fetchMovies } from "../funciones/fetch";
import { Link } from 'react-router-dom';
import { animate, motion, useMotionValue } from "framer-motion";

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

  const handleMouseMove = (e, ref, trackMouse, startX, scrollLeft, setAnimationComplete) => {
    if (!ref.current || !trackMouse) return;
    setAnimationComplete(false);
    const xVal = e.pageX - ref.current.offsetLeft;
    const walk = (xVal - startX) * 2;
    const controls = animate(scrollLeft, scrollLeft - walk, {
      type: "tween",
      ease: "easeOut",
      duration: 0.5,
      onUpdate: (val) => {
        if (!ref.current) return;
        ref.current.scrollLeft = val;
      },
      onComplete: () => {
        setAnimationComplete(true);
      },
      onStop: () => {
        setAnimationComplete(true);
      }
    });
    return controls.stop;
  };

  const handleMouseDown = (e, ref, setTrackMouse, setStartX, setScrollLeft) => {
    if (!ref.current) return;
    setTrackMouse(true);
    const startX = e.pageX - ref.current.offsetLeft;
    setStartX(startX);
    const scrollLeft = ref.current.scrollLeft;
    setScrollLeft(scrollLeft);
  };

  const handleMouseLeave = (setTrackMouse) => {
    setTrackMouse(false);
  };

  const handleMouseUp = (setTrackMouse) => {
    setTrackMouse(false);
  };

  return (
    <>
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
                <MovieCarousel movies={movies}
                  handleMouseMove={handleMouseMove}
                  handleMouseDown={handleMouseDown}
                  handleMouseLeave={handleMouseLeave}
                  handleMouseUp={handleMouseUp} />
              </div>
            ))}
          </div>

        )}
      </div>
    </>
  );
};

const MovieCarousel = ({ movies, handleMouseMove, handleMouseDown, handleMouseLeave, handleMouseUp }) => {
  const ref = useRef(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [trackMouse, setTrackMouse] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(true);
  const x = useMotionValue(0);

  return (
    <div className="MovieList">
      <motion.ul
        ref={ref}
        onMouseMove={(e) => handleMouseMove(e, ref, trackMouse, startX, scrollLeft, setAnimationComplete)}
        onMouseDown={(e) => { e.preventDefault(); handleMouseDown(e, ref, setTrackMouse, setStartX, setScrollLeft); }}
        onMouseUp={() => handleMouseUp(setTrackMouse)}
        onMouseLeave={() => handleMouseLeave(setTrackMouse)}
      >

        {movies.map((movie) => (
          <motion.li key={movie.id} >
            <Link to={`/pelicula/id/${movie.id}`}>
              <Card imgUrl={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} title={movie.title} />
            </Link>
          </motion.li>
        ))}

      </motion.ul>
    </div>
  );
};

export default MovieList;
