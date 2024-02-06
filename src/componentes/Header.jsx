import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styleHeader.css';
import logo from '../IMG/MovieWorld logo.png'

const links = [
    {
        name: 'Inicio',
        href: '/',
    },
    {
        name: 'Películas',
        href: '/peliculas',
    },
    {
        name: 'Series',
        href: '/series',
    },
    {
        name: 'Categorías',
        href: '/categorias',
    },
];

const Header = () => {
    return (
        <div className='header'>
        <div className='containerHeader'>
            <img src={logo} alt='MovieWorld logo'></img>

            <div className='lista'>
                {links.map((link) => (
                    <Link key={link.name} to={link.href}>
                        {link.name}
                    </Link>
                ))}
            </div>

            <div className='buscador'>
                <input className='inputBuscador' type='text' placeholder='¿Qué película quieres buscar?'/>
                <button className='botonBuscador'>BUSCAR</button>
            </div>
        </div>
    </div>
    );
};

export default Header;
