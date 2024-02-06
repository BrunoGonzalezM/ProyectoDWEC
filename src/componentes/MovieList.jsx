import Card from "./Card"
import React, { useEffect, useState, useRef } from 'react';
import "../styles/stylesMovieList.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import fetchMovies from "../funciones/fetchMovies"
import { Link } from "react-router-dom";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const carruselRef = useRef(null);

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


  const moverIzquierda = () => {
    if (carruselRef.current) {
      carruselRef.current.scrollLeft -= 200;
    }
  };

  const moverDerecha = () => {
    if (carruselRef.current) {
      carruselRef.current.scrollLeft += 200;
    }
  };

  return (
    <>
      <div id="movies-list">
        {error ? (
          <p>{error}</p>
        ) : (
          <div className="MovieList">
            <div className="arrowIzquierda" onClick={moverIzquierda}><IoIosArrowBack size={50} color="white" /></div>
            <div className="carrusel" ref={carruselRef}>
              {movies.map((movie) => (
                <div key={movie.id} className="card">
                  <Link to={`/pelicula/${movie.id}`}>
                    <Card imgUrl={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} title={movie.title}  />
                  </Link>
                </div>
              ))}
            </div>
            <div className="arrowDerecha" onClick={moverDerecha}><IoIosArrowForward size={50} color="white" /></div>
          </div>
        )}
      </div>
    </>
  );
};

export default MovieList;
