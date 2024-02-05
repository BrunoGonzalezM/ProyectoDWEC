import React from 'react'
import MovieList from './MovieList'
import "../styles/stylesContainer.css"
export default function Container() {
    return (
        <>
            <div className='contenido'>
                <MovieList />
            </div>
        </>
    )
}

