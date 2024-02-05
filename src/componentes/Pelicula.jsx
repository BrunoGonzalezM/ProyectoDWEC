import React from 'react';

export default function Pelicula(peliculaId) {
    return (
        <div className="">
            <iframe width="420" height="315"
                src={`https://www.youtube.com/watch?v=${peliculaId.key}`}>
            </iframe>
        </div>
    );
}