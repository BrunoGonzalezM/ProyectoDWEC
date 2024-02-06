
const fetchMovieTrailers = async (peliculaId) => {
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
        return data.results[0]
    } catch (err) {
        console.error(err);
        throw err
    }
};

export default fetchMovieTrailers;