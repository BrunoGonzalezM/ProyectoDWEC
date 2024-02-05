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
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?&page=1&sort_by=popularity.desc`, options);
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

export default fetchMovies;