const AUTHcode = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzhhZWI4NTM0ZTViMjEwNTg1M2M4NjE0MGM4Yzc3MCIsInN1YiI6IjY1YjNkZmQyNTU0MWZhMDE2NGIxODQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j8sdRSc8ytai4z5XJI4z3J0upLvu65EC_MPNvX0zxbk"
const urlAPIv3 = "https://api.themoviedb.org/3"
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `${AUTHcode}`
    }
};

export const fetchBusqueda = async (page, busqueda, isMovie) => {
    try {
        const type = isMovie == true ? "movie" : "tv"
        const response = await fetch(`${urlAPIv3}/search/${type}?query=${busqueda}&include_adult=false&language=es-ES&page=${page}`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error("La respuesta del servidor está vacía");
        }
        return data.results;

    } catch (error) {
        throw error
    }
}
export const moviesPopular = async (page, parametroVacio, isMovie) => {
    try {
        const type = isMovie == true ? "movie" : "tv"
        const chPopularTopRated = isMovie == true ? "popular" : "top_rated"
        const response = await fetch(`${urlAPIv3}/${type}/${chPopularTopRated}?language=es-ES&page=${page}`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error("La respuesta del servidor está vacía");
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

export const fetchCategoriaPelicula = async (page, id, isMovie) => {
    try {
        const type = isMovie == true ? "movie" : "tv"
        const response = await fetch(`${urlAPIv3}/discover/${type}?include_adult=false&language=es-ES&page=${page}&sort_by=popularity.desc&with_genres=${id}`, options)
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
export const fetchCreditos = async (id, isMovie) => {
    try {
        const type = isMovie == true ? "movie" : "tv"
        const response = await fetch(`${urlAPIv3}/${type}/${id}/credits?language=es-ES`, options)
        const data = await response.json();

        return data;
    } catch (err) {
        console.error(err);
        throw err
    }
};

export const fetchMovieDetails = async (id, isMovie) => {
    try {
        const type = isMovie == true ? "movie" : "tv"
        const response = await fetch(`${urlAPIv3}/${type}/${id}?language=es-ES`, options)
        const data = await response.json();
        if (!response.ok) {
            throw new Error("Error al encontrar los detalles")
        }
        if(!data.overview){
            const response2 = await fetch(`${urlAPIv3}/${type}/${id}`, options)
            const data2 = await response2.json()
            return data2;
        }
        return data;
    } catch (err) {
        console.error(err);
        throw err
    }
}
export const fetchMovieTrailers = async (id, isMovie) => {
    try {
        const type = isMovie == true ? "movie" : "tv"
        const response = await fetch(`${urlAPIv3}/${type}/${id}/videos?language=es-ES`, options)
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

export const fetchPersonId = async (id) => {
    try{
        const response = await fetch(`${urlAPIv3}/person/${id}?language=es-ES`, options)
        const data = await response.json();
        if(!response.ok){
            throw new Error("Error al encontrar a la persona")
        }
        if(!data.biography){
            const response2 = await fetch(`${urlAPIv3}/person/${id}`, options)
            const data2 = await response2.json();
            return data2;
        }
        return data;
    }catch (err){
        console.log(err);
        throw err;
    }
};

export const fetchPersonCredits = async (id) => {
    try{
        const response = await fetch(`${urlAPIv3}/person/${id}/combined_credits?language=es-ES`, options)
        const data = await response.json();
        return data;
    }catch(err){
        console.log(err);
        throw err;
    }
};

export const fetchKeywords = async (id) => {
    try{
        const response = await fetch(`${urlAPIv3}/movie/${id}/keywords?language=es-ES`, options)
        const data = await response.json();
        return data;
    }catch(err){
        console.log(err);
        throw err;
    }
};

export const fetchSimilarMovies = async (id) => {
    try{
        const response = await fetch(`${urlAPIv3}/movie/${id}/similar?language=es-ES`, options)
        const data = await response.json();
        return data;
    }catch(err){
        console.log(err);
        throw err;
    }
};