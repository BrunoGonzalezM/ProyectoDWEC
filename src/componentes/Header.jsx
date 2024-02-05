import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styleHeader.css';

const links = [
    {
        name: 'Inicio',
        href: '/',
    },
    {
        name: 'Peliculas',
        href: '/peliculas',
    },
    {
        name: 'Series',
        href: '/series',
    },
    {
        name: 'Categorias',
        href: '/categorias',
    },
];

const Header = () => {
    return (
        <div className='header'>
        <div className='containerHeader'>
            <h1>PelisFlix</h1>

            <div className='lista'>
                {links.map((link) => (
                    <Link key={link.name} to={link.href}>
                        {link.name}
                    </Link>
                ))}
            </div>

            <div className='buscador'>
                <input type='text' />
                <button>Buscar</button>
            </div>
        </div>
    </div>
    );
};

export default Header;
