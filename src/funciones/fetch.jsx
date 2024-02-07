export const fetchCategorias = async () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzhhZWI4NTM0ZTViMjEwNTg1M2M4NjE0MGM4Yzc3MCIsInN1YiI6IjY1YjNkZmQyNTU0MWZhMDE2NGIxODQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j8sdRSc8ytai4z5XJI4z3J0upLvu65EC_MPNvX0zxbk'
        }
    };
    try {
        const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=es', options)
        const data = await response.json();
        return data.genres;

    } catch (err) {
        console.error(err);
        throw err
    }
};

export const fetchMovies = async (option) => {
    let url;
    switch (option) {
        case 1:
            url = 'https://api.themoviedb.org/3/movie/popular?language=es-ES&page=1';
            break;
        case 2:
            url = 'https://api.themoviedb.org/3/movie/top_rated?language=es-ES&page=1';
            break;
        case 3:
            url = 'https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=2';
            break;
        default:
            throw new Error('Hubo un error!');
    }

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzhhZWI4NTM0ZTViMjEwNTg1M2M4NjE0MGM4Yzc3MCIsInN1YiI6IjY1YjNkZmQyNTU0MWZhMDE2NGIxODQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j8sdRSc8ytai4z5XJI4z3J0upLvu65EC_MPNvX0zxbk'
        }
    };
    try {
        const response = await fetch(url, options)
        const data = await response.json();
        if (!response.ok) {
            throw new Error('No se han encontrado las películas');
        } else {
            return data.results;
        }
    } catch (err) {
        console.error(err);
        throw new Error('Error al obtener la lista de películas');
    }
};

export const fetchCreditos = async (id) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzhhZWI4NTM0ZTViMjEwNTg1M2M4NjE0MGM4Yzc3MCIsInN1YiI6IjY1YjNkZmQyNTU0MWZhMDE2NGIxODQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j8sdRSc8ytai4z5XJI4z3J0upLvu65EC_MPNvX0zxbk'
        }
    };
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=es-ES`, options)
        const data = await response.json();

        return data;
    } catch (err) {
        console.error(err);
        throw err
    }
};
export const fetchCategoriaPelicula = async (id) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzhhZWI4NTM0ZTViMjEwNTg1M2M4NjE0MGM4Yzc3MCIsInN1YiI6IjY1YjNkZmQyNTU0MWZhMDE2NGIxODQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j8sdRSc8ytai4z5XJI4z3J0upLvu65EC_MPNvX0zxbk'
        }
    };

    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-ES&page=1&sort_by=popularity.desc&with_genres=${id}`, options)
        const data = await response.json();

        return data.results;
    } catch (err) {
        console.error(err);
        throw err
    }
};
export const fetchMovieDetails = async (id) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzhhZWI4NTM0ZTViMjEwNTg1M2M4NjE0MGM4Yzc3MCIsInN1YiI6IjY1YjNkZmQyNTU0MWZhMDE2NGIxODQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j8sdRSc8ytai4z5XJI4z3J0upLvu65EC_MPNvX0zxbk'
        }
    };
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=es-ES`, options)

        const data = await response.json();
        if (!response.ok) {
            throw new Error("Error al encontrar los detalles")
        }
        return data;
    } catch (err) {
        console.error(err);
        throw err
    }
}
export const fetchMovieTrailers = async (peliculaId) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzhhZWI4NTM0ZTViMjEwNTg1M2M4NjE0MGM4Yzc3MCIsInN1YiI6IjY1YjNkZmQyNTU0MWZhMDE2NGIxODQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j8sdRSc8ytai4z5XJI4z3J0upLvu65EC_MPNvX0zxbk'
        }
    };
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${peliculaId}/videos?language=es-ES`, options)
        const data = await response.json();

        if (!response.ok) {
            throw new Error("Error al encontrar el trailer")
        }
        const trailers = data.results.filter(result => result.type === "Trailer");

        return trailers[0];
    } catch (err) {
        console.error(err);
        throw err
    }
};