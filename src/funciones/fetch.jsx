export const fetchCategorias = async () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzhhZWI4NTM0ZTViMjEwNTg1M2M4NjE0MGM4Yzc3MCIsInN1YiI6IjY1YjNkZmQyNTU0MWZhMDE2NGIxODQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j8sdRSc8ytai4z5XJI4z3J0upLvu65EC_MPNvX0zxbk'
        }
    };
    try {
        const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
        const data = await response.json();

        return data.genres;
    } catch (err) {
        console.error(err);
        throw err
    }
};

export const fetchMovies = async () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzhhZWI4NTM0ZTViMjEwNTg1M2M4NjE0MGM4Yzc3MCIsInN1YiI6IjY1YjNkZmQyNTU0MWZhMDE2NGIxODQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j8sdRSc8ytai4z5XJI4z3J0upLvu65EC_MPNvX0zxbk'
        }
    };

    try {
        let page = Math.random() * 99;
        // const response = await fetch(`https://api.themoviedb.org/3/discover/movie?&page=1&sort_by=popularity.desc`, options);
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`, options)
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            return data.results;
        } else {
            throw new Error('No se ha encontrado ninguna película');
        }
    } catch (err) {
        console.error(err);
        throw new Error('Error al obtener la lista de películas');
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
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`, options)
        const data = await response.json();

        return data.results;
    } catch (err) {
        console.error(err);
        throw err
    }
};
export const fetchMovieDetails = async (id) =>{
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzhhZWI4NTM0ZTViMjEwNTg1M2M4NjE0MGM4Yzc3MCIsInN1YiI6IjY1YjNkZmQyNTU0MWZhMDE2NGIxODQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j8sdRSc8ytai4z5XJI4z3J0upLvu65EC_MPNvX0zxbk'
        }
    };
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)

        const data = await response.json();

        if(!response.ok){
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
        const response = await fetch(`https://api.themoviedb.org/3/movie/${peliculaId}/videos?language=en-US`, options)
        const data = await response.json();

        if(!response.ok){
            throw new Error("Error al encontrar el trailer")  
        }
        const trailers = data.results.filter(result => result.type === "Trailer");

        return trailers[0];
    } catch (err) {
        console.error(err);
        throw err
    }
};