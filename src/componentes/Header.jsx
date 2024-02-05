import React from 'react'
import "../styles/styleHeader.css"
export default function Header() {
    return (
        <>
            <div className='header'>
                <div className='containerHeader'>
                    <h1>PelisFlix</h1>
                    <ul className='lista'>
                        <li><a href="#">Peliculas</a></li>
                        <li><a href="#">Series</a></li>
                        <li><a href="#">Categorias</a></li>
                    </ul>
                    <div className="buscardor">
                        <input type="text" />
                        <button>Buscar</button>
                    </div>
                </div>
            </div>
        </>
    )
}
