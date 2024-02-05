import Card from "./Card"
import React, { useEffect, useState, useRef } from 'react';
import "../styles/stylesMovieList.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);


  const carruselRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzhhZWI4NTM0ZTViMjEwNTg1M2M4NjE0MGM4Yzc3MCIsInN1YiI6IjY1YjNkZmQyNTU0MWZhMDE2NGIxODQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j8sdRSc8ytai4z5XJI4z3J0upLvu65EC_MPNvX0zxbk'
        }
      };

      try {
        let page = Math.random() * 99;
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?&page=1&sort_by=popularity.desc`, options)
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          setMovies(data.results);
        } else {
          setError('No se ha encontrado ninguna película');
        }
      } catch (err) {
        console.error(err);
        setError('Error al obtener la lista de películas');
      }
    };

    fetchMovies();
  }, []);

  const moverIzquierda = () => {
    if (carruselRef.current) {
      carruselRef.current.scrollLeft -= 150;
    }
  };

  const moverDerecha = () => {
    if (carruselRef.current) {
      carruselRef.current.scrollLeft += 150;
    }
  };

  return (
    <>
      <div id="movies-list">
        {error ? (
          <p>{error}</p>
        ) : (
          <div className="MovieList">
            <div className="arrowIzquierda" onClick={moverIzquierda}><IoIosArrowBack /></div>
            <div className="carrusel" ref={carruselRef}>
              {movies.map((movie) => (
                <div key={movie.id} className="card">
                  <Card imgUrl={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} title={movie.title} />
                </div>
              ))}
            </div>
            <div className="arrowDerecha" onClick={moverDerecha}><IoIosArrowForward /></div>
          </div>
        )}
      </div>
    </>
  );
};

export default MovieList;
