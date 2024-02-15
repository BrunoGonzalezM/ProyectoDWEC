const AUTHcode = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzhhZWI4NTM0ZTViMjEwNTg1M2M4NjE0MGM4Yzc3MCIsInN1YiI6IjY1YjNkZmQyNTU0MWZhMDE2NGIxODQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j8sdRSc8ytai4z5XJI4z3J0upLvu65EC_MPNvX0zxbk"
const urlAPIv3 = "https://api.themoviedb.org/3"
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `${AUTHcode}`
    }
};

export const fetchBusqueda = async (busqueda, page, isMovie) => {
    try {
        const response = await fetch(`${urlAPIv3}/search/${isMovie ? "movie" : "tv"}?query=${busqueda}&include_adult=false&language=es-ES&page=${page}`, options);
        const responseData = await response.text();
        if (!responseData.trim()) {
            throw new Error("La respuesta del servidor está vacía");
        }
        const data = JSON.parse(responseData);
        return data.results;

    } catch (error) {
        throw error
    }
}
export const moviesPopular = async (page, isMovie) => {
    try {
        const response = await fetch(`${urlAPIv3}/${isMovie == 1 ? "movie" : "tv"}/popular?language=es-ES&page=${page}`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`No se han encontrado las ${isMovie ? "películas" : "series"}`);
        } else {
            return data.results;
        }
    } catch (err) {
        console.error(err);
        throw new Error('Error al obtener la lista de películas');
    }
}
export const moviesTopRated = async (page) => {
    try {
        const response = await fetch(`${urlAPIv3}/movie/top_rated?language=es-ES&page=${page}`, options);
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
}
export const moviesNowPlaying = async (page) => {
    try {
        const response = await fetch(`${urlAPIv3}/movie/now_playing?language=es-ES&page=${page + 1}`, options);
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
}
export const moviesTrending = async (page) => {
    try {
        const response = await fetch(`${urlAPIv3}/trending/movie/day?include_adult=false&language=es-ES&page=${page}`, options);
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
}

export const fetchCategoriaPelicula = async (id, page) => {
    try {
        const response = await fetch(`${urlAPIv3}/discover/movie?include_adult=false&language=es-ES&page=${page}&sort_by=popularity.desc&with_genres=${id}`, options)
        const data = await response.json();

        return data.results;
    } catch (err) {
        console.error(err);
        throw err
    }
};
export const fetchCategorias = async () => {
    try {
        const response = await fetch(`${urlAPIv3}/genre/movie/list?language=es-ES`, options)
        const data = await response.json();
        return data.genres;

    } catch (err) {
        console.error(err);
        throw err
    }
};
export const fetchCreditos = async (id) => {
    try {
        const response = await fetch(`${urlAPIv3}/movie/${id}/credits?language=es-ES`, options)
        const data = await response.json();

        return data;
    } catch (err) {
        console.error(err);
        throw err
    }
};

export const fetchMovieDetails = async (id) => {
    try {
        const response = await fetch(`${urlAPIv3}/movie/${id}?language=es-ES`, options)

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
    try {
        const response = await fetch(`${urlAPIv3}/movie/${peliculaId}/videos?language=es-ES`, options)
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
