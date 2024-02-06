import Card from "./Card"
import React, { useEffect, useState, useRef } from 'react';
import "../styles/stylesMovieList.css";
import { fetchMovies } from "../funciones/fetch"
import { Link } from 'react-router-dom';
import { animate, motion, useMotionValue } from "framer-motion";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  //HOOKS DE CARRUSEL
  const ref = useRef(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [trackMouse, setTrackMouse] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesData = await fetchMovies();
        setMovies(moviesData);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  //FUNCIONES CARRUSEL 
  useEffect(() => {
    const arr = new Array(10).fill(undefined).map((val, idx) => idx);
    setItems(arr);
  }, []);
  const x = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    if (!trackMouse) return;
    setAnimationComplete(false);
    const xVal = e.pageX - ref.current.offsetLeft;
    const walk = (xVal - startX) * 2;
    const controls = animate(x, scrollLeft - walk, {
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
  const handleMouseDown = (e) => {
    if (!ref.current) return;
    setTrackMouse(true);
    const startX = e.pageX - ref.current.offsetLeft;
    setStartX(startX);
    const scrollLeft = ref.current.scrollLeft;
    setScrollLeft(scrollLeft);
  };
  const handleMouseLeave = () => {
    setTrackMouse(false);
  };
  const handleMouseUp = () => {
    setTrackMouse(false);
  };

  return (
    <>
      <div id="movies-list">
        {error ? (
          <p>{error}</p>
        ) : (
          <div className="contenidoMovieList">
            <h1>Peliculas</h1>

            <div className="MovieList">

              <motion.ul
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleMouseDown(e);
                }}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
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
          </div>
        )}
      </div>
    </>
  );
};

export default MovieList;
