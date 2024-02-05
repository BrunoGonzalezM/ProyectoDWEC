const fetchTrailer = async () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzhhZWI4NTM0ZTViMjEwNTg1M2M4NjE0MGM4Yzc3MCIsInN1YiI6IjY1YjNkZmQyNTU0MWZhMDE2NGIxODQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j8sdRSc8ytai4z5XJI4z3J0upLvu65EC_MPNvX0zxbk'
        }
    };

    try {
        const movie_id = 866398;
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`, options)
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

export default fetchTrailer;